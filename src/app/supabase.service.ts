import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://evlbmnlihebnygolmusu.supabase.co';
  private supabaseKey = 'sb_publishable__T7bBBm5XtH3w_XxU2dITA_bzQEaJDw';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get client() {
    return this.supabase;
  }
}
