// src/lib/stores/authStore.svelte.ts
import { tokenStore } from '$lib/utils/tokenStorage';
import { getProfile } from '$lib/service/api';
import type { User } from '$lib/types/user';
import { goto } from '$app/navigation';

class AuthStore {
  isLoggedIn = $state(false);
  userProfile = $state<User | null>(null);
  isLoading = $state(true);

  async getDataProfile(): Promise<void> {
    try {
      const resp = await getProfile();
      this.userProfile = resp.datas;
      this.isLoggedIn = true;
      this.isLoading = false;
    } catch (error) {
      tokenStore.removeToken();
      this.userProfile = null;
      this.isLoggedIn = false;
      this.isLoading = false;
      throw error;
    }
  }

  async validateToken(): Promise<void> {
    try {
      this.isLoading = true;
      const token = tokenStore.retrieveToken();

      if (token) {
        await this.getDataProfile();
      } else {
        this.isLoading = false;
      }
    } catch (error) {
      this.isLoading = false;
      console.error('Token validation failed:', error);
    }
  }

  async login(access_token: string): Promise<void> {
    try {
      tokenStore.storeToken(access_token);
      await this.getDataProfile();
      goto('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout(): void {
    tokenStore.removeToken();
    this.userProfile = null;
    this.isLoggedIn = false;
    goto('/auth/login');
  }
}

export const authStore = new AuthStore();

// Initialize
if (typeof window !== 'undefined') {
  authStore.validateToken();
}
