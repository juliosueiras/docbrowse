import {Observable} from 'data/observable';
import {Zip} from "nativescript-zip";
import * as http from 'http'
import * as fs from 'file-system'
import * as frameModule from 'ui/frame'
import {LoadingIndicator} from "nativescript-loading-indicator"
let folder = fs.knownFolders.documents()

export class ViewModel extends Observable {
    private _officialDocList = [
        {"docName": "Bash","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Bash.zip?raw=true", "docWebIndex": "bash/index.html"},
        {"docName": "Ansible","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Ansible.zip?raw=true", "docWebIndex": "docs.ansible.com/ansible/index.html"},
        {"docName": "BackboneJS","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/BackboneJS.zip?raw=true", "docWebIndex": "index.html"},
        {"docName": "AngularJS","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/AngularJS.zip?raw=true", "docWebIndex": "angular.io/docs/js/latest/index.html"},
    ]

    private _currentDocPath;

    private _userDocList = [
        {"docName": "SDL","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/SDL.zip?raw=true", "docWebIndex": "index.html"}
    ]


    constructor() {
        super();
    }

    get officialDocListItems() {
        return this._officialDocList
    }

    get userDocListItems() {
        return this._userDocList
    }

    public onItemTapUser(args) {
        let docPath = this._userDocList[args.index].docPath
        let docName = this._userDocList[args.index].docName
        let zipPath = fs.path.join(fs.knownFolders.temp().path,  docName + ".zip")
        let dest = fs.path.join(fs.knownFolders.temp().path,  "/" + docName)

        http.getFile(docPath, zipPath).then((res) => {
            Zip.unzip(zipPath, dest);
            this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + this._userDocList[args.index].docWebIndex
            console.log(this._currentDocPath)
            frameModule.topmost().navigate({
                moduleName: 'doc-view',
                backstackVisible: true,
                context: {
                    docName: docName,
                    docPath: this._currentDocPath
                }
            })
        }).catch(function(e) {
            console.log(e)
        })
    }

    public onItemTap(args) {
        let loader = new LoadingIndicator();
        let docPath = this._officialDocList[args.index].docPath
        let docName = this._officialDocList[args.index].docName
        let zipPath = fs.path.join(fs.knownFolders.temp().path,  docName + ".zip")
        let dest = fs.path.join(fs.knownFolders.temp().path,  "/" + docName)

        loader.show(); 


		if(fs.File.exists(dest)) {
            this.changeToDocView(dest, docName, args)
            loader.hide();
            return
        }

        http.getFile(docPath, zipPath).then((res) => {
            Zip.unzip(zipPath, dest);
            this.changeToDocView(dest, docName, args)
            loader.hide();
        }).catch(function(e) {
            console.log(e)
        })
    }

	private changeToDocView(dest: string, docName: string, args) {
            this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + this._officialDocList[args.index].docWebIndex
            console.log(this._currentDocPath)
            frameModule.topmost().navigate({
                moduleName: 'doc-view',
                backstackVisible: true,
                context: {
                    docName: docName,
                    docPath: this._currentDocPath
                }
            })
	}

    public getPathToIndex(args) {
        console.log(args)
        return this._currentDocPath
    }

}