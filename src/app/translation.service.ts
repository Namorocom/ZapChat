import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'pt';

const translations = {
  en: {
    welcome: 'Welcome to ZapChat',
    readOur: 'Read our',
    privacyPolicy: 'Privacy Policy',
    tapAgree: ". Tap 'Agree and continue' to accept the",
    termsOfService: 'Terms of Service',
    agreeAndContinue: 'AGREE AND CONTINUE',
    from: 'from',
    zapStudio: 'ZAP STUDIO',
    languageName: 'English',
    logIn: 'Log in',
    welcomeBack: 'Welcome back',
    enterDetails: 'Enter your details to continue messaging with your friends and family.',
    phoneOrEmail: 'Phone number or Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    orContinueWith: 'or continue with',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign up',
    verifyEmailTitle: 'Check your email',
    verifyEmailMessage: 'We sent you a confirmation link. Please verify your email address to activate your account.',
    backToLogin: 'Back to Log in',
  },
  pt: {
    welcome: 'Bem-vindo ao ZapChat',
    readOur: 'Leia nossa',
    privacyPolicy: 'Política de Privacidade',
    tapAgree: ". Toque em 'Concordar e continuar' para aceitar os",
    termsOfService: 'Termos de Serviço',
    agreeAndContinue: 'CONCORDAR E CONTINUAR',
    from: 'de',
    zapStudio: 'ZAP STUDIO',
    languageName: 'Português',
    logIn: 'Entrar',
    welcomeBack: 'Bem-vindo de volta',
    enterDetails: 'Insira seus dados para continuar enviando mensagens para seus amigos e familiares.',
    phoneOrEmail: 'Número de telefone ou E-mail',
    password: 'Senha',
    forgotPassword: 'Esqueceu a senha?',
    orContinueWith: 'ou continue com',
    dontHaveAccount: 'Não tem uma conta?',
    signUp: 'Inscrever-se',
    verifyEmailTitle: 'Verifique seu e-mail',
    verifyEmailMessage: 'Enviamos um link de confirmação. Por favor, verifique seu endereço de e-mail para ativar sua conta.',
    backToLogin: 'Voltar para o Login',
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal<Language>('en');

  t = computed(() => translations[this.currentLanguage()]);

  toggleLanguage() {
    this.currentLanguage.update(lang => lang === 'en' ? 'pt' : 'en');
  }
}
