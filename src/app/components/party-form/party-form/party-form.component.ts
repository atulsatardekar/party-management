import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from 'src/app/services/party.service';
import { CustomValidators } from '../../sharedComponents/validators/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css']
})
export class PartyFormComponent {
  partyForm: FormGroup;
  isEditMode = false;
  partyId: number | null = null;
  isLoading = false;
  submitted = false;
  error = '';

  // Options for dropdowns
  gstTypes = [
    'UnRegistered',
    'Registered Regular',
    'Registered Composition',
    'Input Service Distributor',
    'Ecommerce Operator'
  ];

  balanceTypes = ['Cr', 'Dr'];
  addressTypes = ['Shipping', 'Billing'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partyService: PartyService,
    private toaster:ToastrService
  ) {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: [''],
      mobile_no: ['', [Validators.required,]],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', Validators.email],
      gst_type: ['UnRegistered'],
      gstin: [''],
      pan_no: [''],
      credit_limit: [0],
      opening_balance: [0],
      opening_balance_type: ['Cr'],
      login_access: [false],
      apply_tds: [false],
      address: this.fb.array([]),
      bank_id: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.partyId = +params['id'];
        this.loadParty(this.partyId);
      }
    });

    // Add one empty address and bank by default
    this.addAddress();
    this.addBank();
  }

  get f() { return this.partyForm.controls; }
  get addresses() { return this.partyForm.get('address') as FormArray; }
  get banks() { return this.partyForm.get('bank_id') as FormArray; }

  createAddressGroup(address?: any) {
    return this.fb.group({
      address_line_1: [address?.address_line_1 || '', Validators.required],
      address_line_2: [address?.address_line_2 || ''],
      country: [address?.country || '', Validators.required],
      state: [address?.state || '', Validators.required],
      city: [address?.city || '', Validators.required],
      pincode: [address?.pincode || '', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      address_type: [address?.address_type || 'Shipping', Validators.required]
    });
  }

  createBankGroup(bank?: any) {
    return this.fb.group({
      bank_ifsc_code: [bank?.bank_ifsc_code || '', Validators.required],
      bank_name: [bank?.bank_name || '', Validators.required],
      branch_name: [bank?.branch_name || '', Validators.required],
      account_no: [bank?.account_no || '', [Validators.required]],
      account_holder_name: [bank?.account_holder_name || '', Validators.required]
    });
  }

  addAddress(address?: any) {
    this.addresses.push(this.createAddressGroup(address));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  addBank(bank?: any) {
    this.banks.push(this.createBankGroup(bank));
  }

  removeBank(index: number) {
    this.banks.removeAt(index);
  }

  loadParty(id: number) {
    this.isLoading = true;
    this.partyService.getParty(id).subscribe({
      next: (party) => {
        this.partyForm.patchValue(party);

        // Clear existing arrays
        while (this.addresses.length) this.addresses.removeAt(0);
        while (this.banks.length) this.banks.removeAt(0);

        // Add addresses and banks from the loaded party
        if (party.address) {
          party.address.forEach((addr: any) => this.addAddress(addr));
        } else {
          this.addAddress();
        }

        if (party.bank_id) {
          party.bank_id.forEach((bank: any) => this.addBank(bank));
        } else {
          this.addBank();
        }

        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load party details';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.partyForm.invalid) {
      return;
    }

    this.isLoading = true;
    const partyData = this.partyForm.value;

    if (this.isEditMode && this.partyId) {
      this.partyService.updateParty(this.partyId, partyData).subscribe({
        next: (res:any) => {
          if (res.success) {
            this.toaster.success(res?.msg || 'Party updated successfully', 'Success');
            this.isLoading = false;
            this.router.navigate(['/parties']);
          } else {
            this.toaster.error(res?.msg || 'Failed to update party', 'Error');
          }
        },
        error: (error) => {
          console.log(error, 'errrp');
          this.toaster.error(error.error?.msg || 'Something went wrong!', 'Error');
          this.isLoading = false;
        }
      });
    } else {
      this.partyService.createParty(partyData).subscribe({
        next: () => {
          this.router.navigate(['/parties']);
        },
        error: (error) => {
          this.toaster.error(error?.error, 'Error');
          this.error = error.error.message || 'Failed to create party';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/parties']);
  }
}
