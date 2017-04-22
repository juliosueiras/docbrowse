"use strict";
var observable_1 = require("data/observable");
var nativescript_zip_1 = require("nativescript-zip");
var http = require("http");
var fs = require("file-system");
var frameModule = require("ui/frame");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var Sqlite = require('nativescript-sqlite');
var folder = fs.knownFolders.documents();
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this._officialDocList = [
            { "docName": "Bash", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Bash.zip?raw=true", "docWebIndex": "bash/index.html" },
            { "docName": "Ansible", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Ansible.zip?raw=true", "docWebIndex": "docs.ansible.com/ansible/index.html" },
            { "docName": "BackboneJS", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/BackboneJS.zip?raw=true", "docWebIndex": "index.html" },
            { "docName": "AngularJS", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/AngularJS.zip?raw=true", "docWebIndex": "angular.io/docs/js/latest/index.html" },
        ];
        _this._userDocList = [
            { "docName": "SDL", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/SDL.zip?raw=true", "docWebIndex": "index.html" }
        ];
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "officialDocListItems", {
        get: function () {
            return this._officialDocList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "userDocListItems", {
        get: function () {
            return this._userDocList;
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.onItemTapUser = function (args) {
        var _this = this;
        var docPath = this._userDocList[args.index].docPath;
        var docName = this._userDocList[args.index].docName;
        var zipPath = fs.path.join(fs.knownFolders.temp().path, docName + ".zip");
        var dest = fs.path.join(fs.knownFolders.temp().path, "/" + docName);
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + _this._userDocList[args.index].docWebIndex;
            console.log(_this._currentDocPath);
            frameModule.topmost().navigate({
                moduleName: 'doc-view',
                backstackVisible: true,
                context: {
                    docName: docName,
                    docPath: _this._currentDocPath
                }
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ViewModel.prototype.onItemTap = function (args) {
        var _this = this;
        var loader = new nativescript_loading_indicator_1.LoadingIndicator();
        var docPath = this._officialDocList[args.index].docPath;
        var docName = this._officialDocList[args.index].docName;
        var zipPath = fs.path.join(fs.knownFolders.temp().path, docName + ".zip");
        var dest = fs.path.join(fs.knownFolders.temp().path, "/" + docName);
        loader.show();
        if (fs.File.exists(dest)) {
            this.changeToDocView(dest, docName, args);
            loader.hide();
            return;
        }
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this.changeToDocView(dest, docName, args);
            loader.hide();
        }).catch(function (e) {
            console.log(e);
        });
    };
    ViewModel.prototype.changeToDocView = function (dest, docName, args) {
        this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + this._officialDocList[args.index].docWebIndex;
        var docIndexArray = [];
        new Sqlite(dest + '/' + docName + ".docset/Contents/Resources/docSet.dsidx", function (err, db) {
            db.all('select * from searchIndex', function (err, resultSet) {
                resultSet.forEach(function (i) {
                    docIndexArray.push({
                        id: i[0],
                        name: i[1],
                        type: i[2],
                        path: i[3],
                    });
                });
                frameModule.topmost().navigate({
                    moduleName: 'doc-list',
                    backstackVisible: true,
                    context: {
                        docName: docName,
                        goBack: function (args) {
                            frameModule.topmost().navigate('main-page');
                        },
                        getListing: docIndexArray,
                        goToDoc: function (args) {
                            var docItem = docIndexArray[args.index];
                            frameModule.topmost().navigate({
                                moduleName: 'doc-view',
                                backstackVisible: true,
                                context: {
                                    docName: docName + "(" + docItem.name + ")",
                                    docPath: dest + '/' + docName + ".docset/Contents/Resources/Documents/" + docItem.path.split("#")[0],
                                    goBack: function (args) {
                                        frameModule.topmost().navigate('main-page');
                                    },
                                }
                            });
                        }
                    }
                });
            });
        });
    };
    ViewModel.prototype.getPathToIndex = function (args) {
        console.log(args);
        return this._currentDocPath;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFDM0MscURBQXFDO0FBQ3JDLDJCQUE0QjtBQUM1QixnQ0FBaUM7QUFDakMsc0NBQXVDO0FBQ3ZDLGlGQUFnRTtBQUNoRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBU3hDO0lBQStCLDZCQUFVO0lBZXJDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaEJPLHNCQUFnQixHQUFHO1lBQ3ZCLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxTQUFTLEVBQUUsa0ZBQWtGLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFDO1lBQ25KLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxTQUFTLEVBQUUscUZBQXFGLEVBQUUsYUFBYSxFQUFFLHFDQUFxQyxFQUFDO1lBQzdLLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxTQUFTLEVBQUUsd0ZBQXdGLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQztZQUMxSixFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsU0FBUyxFQUFFLHVGQUF1RixFQUFFLGFBQWEsRUFBRSxzQ0FBc0MsRUFBQztTQUNyTCxDQUFBO1FBSU8sa0JBQVksR0FBRztZQUNuQixFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsU0FBUyxFQUFFLGlGQUFpRixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUM7U0FDL0ksQ0FBQTs7SUFLRCxDQUFDO0lBRUQsc0JBQUksMkNBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFnQjthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJ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QUM7SUFHTCxnQkFBQztBQUFELENBQUMsQUE1SEQsQ0FBK0IsdUJBQVUsR0E0SHhDO0FBNUhZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHtaaXB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSdcbmltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3VpL2ZyYW1lJ1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5sZXQgU3FsaXRlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNxbGl0ZScpO1xubGV0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKVxuXG5pbnRlcmZhY2UgRG9jSW5kZXhJdGVtIHtcbiAgICBpZDogTnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBfb2ZmaWNpYWxEb2NMaXN0ID0gW1xuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiQmFzaFwiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL0Jhc2guemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJiYXNoL2luZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJBbnNpYmxlXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQW5zaWJsZS56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImRvY3MuYW5zaWJsZS5jb20vYW5zaWJsZS9pbmRleC5odG1sXCJ9LFxuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiQmFja2JvbmVKU1wiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL0JhY2tib25lSlMuemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJpbmRleC5odG1sXCJ9LFxuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiQW5ndWxhckpTXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQW5ndWxhckpTLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiYW5ndWxhci5pby9kb2NzL2pzL2xhdGVzdC9pbmRleC5odG1sXCJ9LFxuICAgIF1cblxuICAgIHByaXZhdGUgX2N1cnJlbnREb2NQYXRoO1xuXG4gICAgcHJpdmF0ZSBfdXNlckRvY0xpc3QgPSBbXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJTRExcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9TREwuemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJpbmRleC5odG1sXCJ9XG4gICAgXVxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXQgb2ZmaWNpYWxEb2NMaXN0SXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZpY2lhbERvY0xpc3RcbiAgICB9XG5cbiAgICBnZXQgdXNlckRvY0xpc3RJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJEb2NMaXN0XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcFVzZXIoYXJncykge1xuICAgICAgICBsZXQgZG9jUGF0aCA9IHRoaXMuX3VzZXJEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY1BhdGhcbiAgICAgICAgbGV0IGRvY05hbWUgPSB0aGlzLl91c2VyRG9jTGlzdFthcmdzLmluZGV4XS5kb2NOYW1lXG4gICAgICAgIGxldCB6aXBQYXRoID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy50ZW1wKCkucGF0aCwgIGRvY05hbWUgKyBcIi56aXBcIilcbiAgICAgICAgbGV0IGRlc3QgPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLnRlbXAoKS5wYXRoLCAgXCIvXCIgKyBkb2NOYW1lKVxuXG4gICAgICAgIGh0dHAuZ2V0RmlsZShkb2NQYXRoLCB6aXBQYXRoKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIFppcC51bnppcCh6aXBQYXRoLCBkZXN0KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnREb2NQYXRoID0gZGVzdCArICcvJyArIGRvY05hbWUgKyAnLmRvY3NldC9Db250ZW50cy9SZXNvdXJjZXMvRG9jdW1lbnRzLycgKyB0aGlzLl91c2VyRG9jTGlzdFthcmdzLmluZGV4XS5kb2NXZWJJbmRleFxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fY3VycmVudERvY1BhdGgpXG4gICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICdkb2MtdmlldycsXG4gICAgICAgICAgICAgICAgYmFja3N0YWNrVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY05hbWU6IGRvY05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRvY1BhdGg6IHRoaXMuX2N1cnJlbnREb2NQYXRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgbGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4gICAgICAgIGxldCBkb2NQYXRoID0gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY1BhdGhcbiAgICAgICAgbGV0IGRvY05hbWUgPSB0aGlzLl9vZmZpY2lhbERvY0xpc3RbYXJncy5pbmRleF0uZG9jTmFtZVxuICAgICAgICBsZXQgemlwUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgsICBkb2NOYW1lICsgXCIuemlwXCIpXG4gICAgICAgIGxldCBkZXN0ID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy50ZW1wKCkucGF0aCwgIFwiL1wiICsgZG9jTmFtZSlcblxuICAgICAgICBsb2FkZXIuc2hvdygpOyBcblxuXG5cdFx0aWYoZnMuRmlsZS5leGlzdHMoZGVzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVG9Eb2NWaWV3KGRlc3QsIGRvY05hbWUsIGFyZ3MpXG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBodHRwLmdldEZpbGUoZG9jUGF0aCwgemlwUGF0aCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBaaXAudW56aXAoemlwUGF0aCwgZGVzdCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRvRG9jVmlldyhkZXN0LCBkb2NOYW1lLCBhcmdzKVxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfSlcbiAgICB9XG5cblx0cHJpdmF0ZSBjaGFuZ2VUb0RvY1ZpZXcoZGVzdDogc3RyaW5nLCBkb2NOYW1lOiBzdHJpbmcsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnREb2NQYXRoID0gZGVzdCArICcvJyArIGRvY05hbWUgKyAnLmRvY3NldC9Db250ZW50cy9SZXNvdXJjZXMvRG9jdW1lbnRzLycgKyB0aGlzLl9vZmZpY2lhbERvY0xpc3RbYXJncy5pbmRleF0uZG9jV2ViSW5kZXhcbiAgICAgICAgICAgIGxldCBkb2NJbmRleEFycmF5ID0gPEFycmF5PERvY0luZGV4SXRlbT4+W11cbiAgICAgICAgICAgIG5ldyBTcWxpdGUoZGVzdCArICcvJyArIGRvY05hbWUgKyBcIi5kb2NzZXQvQ29udGVudHMvUmVzb3VyY2VzL2RvY1NldC5kc2lkeFwiLCBmdW5jdGlvbihlcnIsIGRiKSB7XG4gICAgICAgICAgICAgICAgZGIuYWxsKCdzZWxlY3QgKiBmcm9tIHNlYXJjaEluZGV4JywgZnVuY3Rpb24oZXJyLCByZXN1bHRTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2V0LmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jSW5kZXhBcnJheS5wdXNoKDxEb2NJbmRleEl0ZW0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGlbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogaVsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBpWzNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ2RvYy1saXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tzdGFja1Zpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jTmFtZTogZG9jTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb0JhY2s6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKCdtYWluLXBhZ2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TGlzdGluZzogZG9jSW5kZXhBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1RvRG9jOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkb2NJdGVtID0gZG9jSW5kZXhBcnJheVthcmdzLmluZGV4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ2RvYy12aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tzdGFja1Zpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jTmFtZTogZG9jTmFtZSArIFwiKFwiICsgZG9jSXRlbS5uYW1lICsgXCIpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jUGF0aDogZGVzdCArICcvJyArIGRvY05hbWUgKyBcIi5kb2NzZXQvQ29udGVudHMvUmVzb3VyY2VzL0RvY3VtZW50cy9cIiArIGRvY0l0ZW0ucGF0aC5zcGxpdChcIiNcIilbMF0gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvQmFjazogZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoJ21haW4tcGFnZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQYXRoVG9JbmRleChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50RG9jUGF0aFxuICAgIH1cblxuXG59Il19