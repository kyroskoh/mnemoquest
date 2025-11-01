import { Howl } from 'howler';

export class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
    this.initSounds();
  }

  private initSounds(): void {
    // For now, we'll use simple beep sounds
    // In production, replace these with actual sound files
    
    // Success sound (high pitch)
    this.sounds.set('success', new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl+zPDZjT0JGGm98OScTwwPU6rl8LRiGwc5ltr0yX4tBSF1xe/gkUMKElyx6OyvWBELSKXh8r1tIgUpfsz'],
      volume: 0.3
    }));

    // Error sound (low pitch)
    this.sounds.set('error', new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl+zPDZjT0JGGm98OScTwwPU6rl8LRiGwc5ltr0yX4tBSF1xe/gkUMKElyx6OyvWBELSKXh8r1tIgUpfsz'],
      volume: 0.3,
      rate: 0.7
    }));

    // Click sound
    this.sounds.set('click', new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl+zPDZjT0JGGm98OScTwwPU6rl8LRiGwc5ltr0yX4tBSF1xe/gkUMKElyx6OyvWBELSKXh8r1tIgUpfsz'],
      volume: 0.2,
      rate: 1.5
    }));

    // Complete sound
    this.sounds.set('complete', new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl+zPDZjT0JGGm98OScTwwPU6rl8LRiGwc5ltr0yX4tBSF1xe/gkUMKElyx6OyvWBELSKXh8r1tIgUpfsz'],
      volume: 0.4,
      rate: 1.2
    }));
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  play(soundName: string): void {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play();
    }
  }

  playSuccess(): void {
    this.play('success');
  }

  playError(): void {
    this.play('error');
  }

  playClick(): void {
    this.play('click');
  }

  playComplete(): void {
    this.play('complete');
  }
}

