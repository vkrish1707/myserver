import { MatDialogConfig, MatDialog } from "@angular/material";
import { DialogBoxComponent } from "./dialogbox.component";

import core = require('./globals');

export enum DialogboxButtons {
    YesNoCancel,
    YesNo,
    OkCancel,
    Ok,
    Cancel,
    Close
}

export function showDialog(title: string, message: string, buttons: DialogboxButtons): Promise<core.DialogboxResult> {

    // prepare the config data
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = {};
    config.data.title = title;
    config.data.message = message;
    config.data.yes = ((buttons == DialogboxButtons.YesNoCancel || buttons == DialogboxButtons.YesNo) ? true : false);
    config.data.no = ((buttons == DialogboxButtons.YesNoCancel || buttons == DialogboxButtons.YesNo) ? true : false);
    config.data.ok = ((buttons == DialogboxButtons.OkCancel || buttons == DialogboxButtons.Ok) ? true : false);
    config.data.cancel = ((buttons == DialogboxButtons.YesNoCancel ||
        buttons == DialogboxButtons.OkCancel ||
        buttons == DialogboxButtons.Cancel) ? true : false);
    config.data.close = ((buttons == DialogboxButtons.Close) ? true : false);

    // create mat dialog instance
    console.log('In Show Dialog');
    let dialog = core.InjectorInstance.get<MatDialog>(MatDialog);
    const reference = dialog.open(DialogBoxComponent, config);

    // return
    return reference.afterClosed().toPromise();
}
