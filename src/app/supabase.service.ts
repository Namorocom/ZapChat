import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://evlbmnlihebnygolmusu.supabase.co';
  private supabaseKey = 'sb_publishable__T7bBBm5XtH3w_XxU2dITA_bzQEaJDw';
  private supabase: SupabaseClient;
  
  currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.next(session?.user ?? null);
    });
  }

  get client() {
    return this.supabase;
  }

  async signUp(email: string, password: string, fullName?: string) {
    return this.supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }
}
