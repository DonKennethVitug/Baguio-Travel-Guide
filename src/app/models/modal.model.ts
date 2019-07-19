/*
 * File: modal.model.ts
 * Project: procryptos-wallet-gui
 * Author: Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * Description:
 * Copyright 2018 - Procryptix LLC
 */

export class ModalFooter {
  public name: string;
  public color?: any = "primary";
  public action?: any = () => {};
}

export class Modal {
  public isOpen: boolean;
  public header_title?: string;
  public body_content?: string;
  public footers?: ModalFooter[];
  public onHideAction?: any = () => {};
  public options?: any = {
    ignoreBackdropClick: false
  };
}
