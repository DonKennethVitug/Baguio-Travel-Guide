/*
 * File: modal.service.ts
 * Project: procryptos-wallet-gui
 * Author: Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * Description:
 * Copyright 2018 - Procryptix LLC
 */

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Modal, ModalFooter } from "../../models";

@Injectable()
export class ModalService {
  public modalValue = new Modal();

  constructor(
    private readonly router: Router,
  ) {}

  private readonly modal: BehaviorSubject<Modal> = new BehaviorSubject<Modal>(
    this.modalValue,
  );

  public getModal(): Observable<Modal> {
    return this.modal.asObservable();
  }

  public async setModal(modal: Modal) {
    const modalValue = new Modal();
    for (const key in modal) {
      modalValue[key] = modal[key];
    }
    for (const i in modal.footers) {
      const footer = new ModalFooter();
      for (let key in modal.footers[i]) {
        footer[key] = modal.footers[i][key];
      }
      modal.footers[i] = footer;
    }
    this.modalValue = modalValue;
    await this.modal.next(modalValue);
  }
}
