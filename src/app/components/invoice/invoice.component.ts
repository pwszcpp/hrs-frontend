import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Instruction } from '../../classes/instruction';
import { DataService } from '../../services/data.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  instruction: Instruction;
  example = new Instruction(1, 'Przykład', 'Przykładowa',
  'Przykładowa', '2017/5/11', '2017/5/20', 120, true, 1);

  constructor(
    private dataService: DataService
  ) { }

  @ViewChild('app-invoice') el: ElementRef;

  ngOnInit() {
    this.getInstruction();

    if (this.instruction == null) {
      this.instruction = this.example;
    }
  }// ngOnInit()

  getInstruction() {
    this.instruction = this.dataService.getInstruction();
  }// getInstruction()

  /* getTotalCost(): number {
    let cost = 0;

    for (let i = 0; i < this.instruction.assign.length; i++) {
      cost = cost + this.instruction.cost;
    }// for

    return cost;
  }// getTotalCost() */

  download() {
    html2canvas(document.getElementById('content')).then(function(canvas) {
    const img = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(img, 'JPEG', 0, 0);
    doc.save('testCanvas.pdf');
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('content').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" type="text/css" href="./invoice.component.css" />
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}
