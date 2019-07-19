/*
 * File: modal.component.ts
 * Project: procryptos-wallet-gui
 * Author: Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * Description:
 * Copyright 2018 - Procryptix LLC
 */

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap";
import { Subscription } from "rxjs";
import { Modal } from "../../../models";
import { ModalService } from "../../../services/main.service.module";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit, OnDestroy {
  public modal: Modal = new Modal();
  @ViewChild("modalDirective")
  public modalDirective: ModalDirective;

  constructor(
    private readonly bsModalService: BsModalService,
    private readonly modalService: ModalService
  ) {}

  private readonly modalRef: BsModalRef;
  private getModal: Subscription;
  private onHideModal: Subscription;
  private isOnModalChangeLoaded = false;

  public ngOnInit() {
    this.onModalChange();
  }

  public ngOnDestroy() {
    if (this.getModal !== undefined) {
      this.getModal.unsubscribe();
    }
    if (this.onHideModal !== undefined) {
      this.onHideModal.unsubscribe();
    }
  }

  public onModalChange() {
    this.getModal = this.modalService.getModal().subscribe((modal: Modal) => {
      if (this.isOnModalChangeLoaded) {
        setTimeout(() => {
          if (modal.isOpen) {
            this.modalDirective.config = {
              ignoreBackdropClick: modal.options.ignoreBackdropClick
            };
            if (this.onHideModal !== undefined) {
              this.onHideModal.unsubscribe();
            }
            this.modal = modal;
            this.modalDirective.show();
            this.onHideModal = this.modalDirective.onHide.subscribe(() => {
              this.modal.onHideAction();
              document.body.className = document.body.className.replace("modal-open","");
            });
          } else {
            this.modalDirective.hide();
          }
        }, 1);
      } else {
        this.isOnModalChangeLoaded = true;
      }
    });
  }
}
