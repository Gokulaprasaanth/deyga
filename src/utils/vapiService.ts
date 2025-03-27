
// Integration for Vapi Voice Assistant

interface VapiConfig {
  apiKey: string;
  assistant: string;
  config?: Record<string, any>;
}

export class VapiService {
  private static instance: VapiService | null = null;
  private vapiInstance: any = null;
  private isLoaded: boolean = false;
  private loadPromise: Promise<void> | null = null;
  private callbackQueue: Array<() => void> = [];

  private constructor() {
    this.loadScript();
  }

  public static getInstance(): VapiService {
    if (!VapiService.instance) {
      VapiService.instance = new VapiService();
    }
    return VapiService.instance;
  }

  private loadScript(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise<void>((resolve) => {
      if (typeof document === 'undefined') {
        console.warn('VapiService: Document is undefined, cannot load script');
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
      script.defer = true;
      script.async = true;
      
      script.onload = () => {
        this.isLoaded = true;
        this.executeCallbacks();
        resolve();
      };

      script.onerror = () => {
        console.error('Failed to load Vapi script');
        resolve();
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  private executeCallbacks(): void {
    while (this.callbackQueue.length > 0) {
      const callback = this.callbackQueue.shift();
      callback?.();
    }
  }

  public async initializeVapi(config: VapiConfig): Promise<void> {
    if (!this.isLoaded) {
      return new Promise((resolve) => {
        this.callbackQueue.push(() => {
          this.initializeVapiInternal(config);
          resolve();
        });
      });
    }

    return this.initializeVapiInternal(config);
  }

  private initializeVapiInternal(config: VapiConfig): Promise<void> {
    return new Promise((resolve) => {
      if (!window.vapiSDK) {
        console.error('Vapi SDK not available');
        resolve();
        return;
      }

      this.vapiInstance = window.vapiSDK.run({
        apiKey: config.apiKey,
        assistant: config.assistant,
        config: config.config || {},
      });

      resolve();
    });
  }

  public startCall(): void {
    if (this.vapiInstance) {
      this.vapiInstance.startCall();
    } else {
      console.warn('Vapi instance not initialized');
    }
  }

  public endCall(): void {
    if (this.vapiInstance) {
      this.vapiInstance.endCall();
    }
  }

  public isCallActive(): boolean {
    return this.vapiInstance ? this.vapiInstance.isCallActive() : false;
  }
}

// Add Vapi types to the global Window interface
declare global {
  interface Window {
    vapiSDK: {
      run: (config: {
        apiKey: string;
        assistant: string;
        config?: Record<string, any>;
      }) => any;
    };
  }
}
