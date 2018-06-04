import { MatDialogConfig, MatDialog } from "@angular/material";
import { Injector } from "@angular/core";
import { DialogBoxComponent } from "./dialogbox.component";

// import core = require('./globals');


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

export function showDialog(title: string, message: string, buttons: DialogBoxButtons): Promise<DialogBoxResult> {

    let InjectorInstance: Injector;
    
    // prepare the config data
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = {};
    config.data.title = title;
    config.data.message = message;
    config.data.yes = ((buttons == DialogBoxButtons.YesNoCancel || buttons == DialogBoxButtons.YesNo) ? true : false);
    config.data.no = ((buttons == DialogBoxButtons.YesNoCancel || buttons == DialogBoxButtons.YesNo) ? true : false);
    config.data.ok = ((buttons == DialogBoxButtons.OkCancel || buttons == DialogBoxButtons.Ok) ? true : false);
    config.data.cancel = ((buttons == DialogBoxButtons.YesNoCancel 
        || buttons == DialogBoxButtons.OkCancel
        || buttons == DialogBoxButtons.Cancel) ? true : false);
    config.data.close = ((buttons == DialogBoxButtons.Close) ? true : false);

    // create MatDialog instance
    console.log('in show Dialog');
    let dialog = InjectorInstance.get<MatDialog>(MatDialog);
    const reference = dialog.open(DialogBoxComponent, config);

    // return
    return reference.afterClosed().toPromise();    
}
