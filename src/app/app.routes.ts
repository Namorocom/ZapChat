import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./welcome.component").then((m) => m.WelcomeComponent),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./login.component").then((m) => m.LoginComponent),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./signup.component").then((m) => m.SignupComponent),
  },
  {
    path: "chats",
    loadComponent: () =>
      import("./chat-list.component").then((m) => m.ChatListComponent),
  },
  {
    path: "chats/:id",
    loadComponent: () =>
      import("./chat-detail.component").then((m) => m.ChatDetailComponent),
  },
  {
    path: "image/:id",
    loadComponent: () =>
      import("./image-viewer.component").then((m) => m.ImageViewerComponent),
  },
  {
    path: "status",
    loadComponent: () =>
      import("./status.component").then((m) => m.StatusComponent),
  },
  {
    path: "calls",
    loadComponent: () =>
      import("./calls.component").then((m) => m.CallsComponent),
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./profile.component").then((m) => m.ProfileComponent),
  },
];
