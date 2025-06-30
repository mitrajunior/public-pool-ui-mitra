import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private PARTICLES = 'PARTICLES';
  private STRATUM_URL = 'STRATUM_URL';

  private _particles$: BehaviorSubject<boolean>;
  public particles$: Observable<boolean>;

  constructor() {
    this._particles$ = new BehaviorSubject<boolean>(this.getParticles());
    this.particles$ = this._particles$.asObservable().pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  private get(key: string): string | null {
    return localStorage.getItem(key);
  }

  private set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }


  public getParticles(): boolean {
    const result = this.get(this.PARTICLES);
    return result == null || JSON.parse(result)?.particles === true;
  }

  public getStratumURL(): string | null {
    return this.get(this.STRATUM_URL);
  }

  public setStratumURL(url: string) {
    this.set(this.STRATUM_URL, url);
  }

  public removeStratumURL() {
    this.remove(this.STRATUM_URL);
  }

  public setParticles(particles: boolean) {
    this.set(this.PARTICLES, JSON.stringify({ particles }));
    this._particles$.next(particles);

  }


}
