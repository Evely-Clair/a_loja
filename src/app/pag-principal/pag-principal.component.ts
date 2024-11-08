import { Component, NgZone, OnInit, ElementRef } from '@angular/core';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { DialogService } from '../../services/dialog.service';
import { PagPrincipalModalComponent } from './pag-principal-modal.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.scss'],
})
export class PagPrincipalComponent implements OnInit {
  public readonly barcodeFormat = BarcodeFormat;
  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;
  public searchValue: string | null = null;

  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone,
    private router : Router,
  ) {}

  public ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
  }

  public onSearch(event:Event) {
    event.preventDefault();
    this.searchValue = (document.getElementById('search') as HTMLInputElement).value
    if (this.searchValue) {
      this.router.navigate(['lista-produtos', this.searchValue]);
    } else {
      alert('Please enter a value to search.');
    }
  }

  public async startScan(): Promise<void> {
    const formats = [this.barcodeFormat.Aztec, this.barcodeFormat.Codabar, this.barcodeFormat.Code39, this.barcodeFormat.Code93, this.barcodeFormat.Code128, this.barcodeFormat.DataMatrix, this.barcodeFormat.Ean8, this.barcodeFormat.Ean13, this.barcodeFormat.Itf, this.barcodeFormat.Pdf417, this.barcodeFormat.UpcA, this.barcodeFormat.UpcE,];

    const element = await this.dialogService.showModal({
      component: PagPrincipalModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
      },
    });

    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.router.navigate(['produto', barcode.displayValue]);
      }
    });
  }
}
