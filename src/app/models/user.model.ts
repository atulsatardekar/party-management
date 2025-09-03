// user.model.ts
export interface User {
  token: string;
  username: string;
}



// <section class="h-100 gradient-form" style="background-color: #eee;">
//   <div class="container py-5 h-100">
//     <div class="row d-flex justify-content-center align-items-center h-100">
//       <div class="col-xl-10">
//         <div class="card rounded-3 text-black">
//           <div class="row g-0">
//             <div class="col-lg-6">
//               <div class="card-body p-md-5 mx-md-4">

//                 <div class="text-center">
//                   <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
//                     style="width: 185px;" alt="logo">
//                     <h4 class="mt-1 mb-5 pb-1">Manage Your Parties with Ease</h4>

//                 </div>

//                 <form>
//                   <p>Please login to your account</p>

//                   <div class="mb-3">
//                     <label for="username" class="form-label">Username</label>
//                     <input type="text" formControlName="username" class="form-control"
//                            [class.is-invalid]="submitted && f['username'].errors" />
//                     <div *ngIf="submitted && f['username'].errors" class="invalid-feedback">
//                       <div *ngIf="f['username'].errors['required']">Username is required</div>
//                     </div>
//                   </div>

//                   <div class="mb-3">
//                     <label for="password" class="form-label">Password</label>
//                     <input type="password" formControlName="password" class="form-control"
//                            [class.is-invalid]="submitted && f['password'].errors" />
//                     <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
//                       <div *ngIf="f['password'].errors['required']">Password is required</div>
//                     </div>
//                   </div>

//                   <div class="text-center pt-1 mb-5 pb-1">
//                     <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" (click)="onSubmit()" type="button">Log
//                       in</button>
//                   </div>



//                 </form>

//               </div>
//             </div>
//             <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
//               <div class="text-white px-3 py-4 p-md-5 mx-md-4">
//                 <h4 class="mb-4">Welcome to Party Management System</h4>
//                 <p class="small mb-0">  Easily manage all your party details in one place.
//                   Create, update, and keep track of your parties with a simple and user-friendly interface.
//                   Get started by logging in with your account to access the dashboard.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
