import { MatDialogConfig, MatDialog } from "@angular/material";
import { Injector } from "@angular/core";
import { DialogBoxComponent } from "./dialog-box.component";
import { promise } from "protractor";

export let InjectorInstance: Injector;

export enum DialogBoxButtons {
    YesNoCancel,
    YesNo,
    OkCancel,
    Ok,
    Cancel,
    Close
}

export enum DialogBoxResult {
    Yes,
    No,
    Ok,
    Cancel,
    Close
}

export function showDialog(title: string, message: string, buttons: DialogBoxButtons) {

    // prepare the config data
    const config = new MatDialogConfig();
    config.data = { };
    config.data.title = title;
    config.data.yes = ((buttons == DialogBoxButtons.YesNoCancel || buttons == DialogBoxButtons.YesNo) ? true : false);
    config.data.No = ((buttons == DialogBoxButtons.YesNoCancel || buttons == DialogBoxButtons.YesNo) ? true : false);
    config.data.Ok = ((buttons == DialogBoxButtons.OkCancel || buttons == DialogBoxButtons.Ok) ? true : false);
    config.data.Cancel = ((buttons == DialogBoxButtons.YesNoCancel 
        || buttons == DialogBoxButtons.OkCancel || buttons == DialogBoxButtons.Cancel) ? true : false);
    config.data.Close = ((buttons == DialogBoxButtons.Close) ? true : false);

    // create matDialog instance
    let dialog =  InjectorInstance.get<MatDialog>( MatDialog );
    const reference = this.dialog.open(DialogBoxComponent, config);

}