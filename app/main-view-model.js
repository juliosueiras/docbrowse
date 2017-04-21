"use strict";
var observable_1 = require("data/observable");
var nativescript_zip_1 = require("nativescript-zip");
var http = require("http");
var fs = require("file-system");
var frameModule = require("ui/frame");
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
            { "docName": "Cordova", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Cordova.zip?raw=true", "docWebIndex": "cordova.apache.org/docs/en/latest/index.html" },
        ];
        _this._userDocList = [
            { "docName": "SDL", "docPath": "org.libsdl.sdl20.docset", "docWebIndex": "index.html" }
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
    ViewModel.prototype.onItemTap = function (args) {
        var _this = this;
        var docPath = this._officialDocList[args.index].docPath;
        var docName = this._officialDocList[args.index].docName;
        var zipPath = "/sdcard/" + docName + ".zip";
        var dest = "/sdcard/" + docName;
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + _this._officialDocList[args.index].docWebIndex;
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
            console.dump(e);
        });
    };
    ViewModel.prototype.getPathToIndex = function (args) {
        console.log(args);
        return this._currentDocPath;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFDM0MscURBQXFDO0FBQ3JDLDJCQUE0QjtBQUM1QixnQ0FBaUM7QUFDakMsc0NBQXVDO0FBQ3ZDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUE7QUFFeEM7SUFBK0IsNkJBQVU7SUFnQnJDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBakJPLHNCQUFnQixHQUFHO1lBQ3ZCLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxTQUFTLEVBQUUsa0ZBQWtGLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFDO1lBQ25KLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxTQUFTLEVBQUUscUZBQXFGLEVBQUUsYUFBYSxFQUFFLHFDQUFxQyxFQUFDO1lBQzdLLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxTQUFTLEVBQUUsd0ZBQXdGLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQztZQUMxSixFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsU0FBUyxFQUFFLHVGQUF1RixFQUFFLGFBQWEsRUFBRSxzQ0FBc0MsRUFBQztZQUNsTCxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsU0FBUyxFQUFFLHFGQUFxRixFQUFFLGFBQWEsRUFBRSw4Q0FBOEMsRUFBQztTQUN6TCxDQUFBO1FBSU8sa0JBQVksR0FBRztZQUNuQixFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUM7U0FDdkYsQ0FBQTs7SUFLRCxDQUFDO0lBRUQsc0JBQUksMkNBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFnQjthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQzVCLENBQUM7OztPQUFBO0lBRU0sNkJBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUFyQixpQkFxQkM7UUFwQkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDdkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDdkQsSUFBSSxPQUFPLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDM0MsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQTtRQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ3BDLHNCQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLHVDQUF1QyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFBO1lBQ3JJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQ2pDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzNCLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixPQUFPLEVBQUU7b0JBQ0wsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxLQUFJLENBQUMsZUFBZTtpQkFDaEM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxDQUFDO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxrQ0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUE7SUFDL0IsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQXhERCxDQUErQix1QkFBVSxHQXdEeEM7QUF4RFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQge1ppcH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJ1xuaW1wb3J0ICogYXMgZnJhbWVNb2R1bGUgZnJvbSAndWkvZnJhbWUnXG5sZXQgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpXG5cbmV4cG9ydCBjbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9vZmZpY2lhbERvY0xpc3QgPSBbXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJCYXNoXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQmFzaC56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImJhc2gvaW5kZXguaHRtbFwifSxcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIkFuc2libGVcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9BbnNpYmxlLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiZG9jcy5hbnNpYmxlLmNvbS9hbnNpYmxlL2luZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJCYWNrYm9uZUpTXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQmFja2JvbmVKUy56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImluZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJBbmd1bGFySlNcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9Bbmd1bGFySlMuemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJhbmd1bGFyLmlvL2RvY3MvanMvbGF0ZXN0L2luZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJDb3Jkb3ZhXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQ29yZG92YS56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImNvcmRvdmEuYXBhY2hlLm9yZy9kb2NzL2VuL2xhdGVzdC9pbmRleC5odG1sXCJ9LFxuICAgIF1cblxuICAgIHByaXZhdGUgX2N1cnJlbnREb2NQYXRoO1xuXG4gICAgcHJpdmF0ZSBfdXNlckRvY0xpc3QgPSBbXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJTRExcIixcImRvY1BhdGhcIjogXCJvcmcubGlic2RsLnNkbDIwLmRvY3NldFwiLCBcImRvY1dlYkluZGV4XCI6IFwiaW5kZXguaHRtbFwifVxuICAgIF1cblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IG9mZmljaWFsRG9jTGlzdEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJEb2NMaXN0SXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyRG9jTGlzdFxuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBsZXQgZG9jUGF0aCA9IHRoaXMuX29mZmljaWFsRG9jTGlzdFthcmdzLmluZGV4XS5kb2NQYXRoXG4gICAgICAgIGxldCBkb2NOYW1lID0gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY05hbWVcbiAgICAgICAgbGV0IHppcFBhdGggPSBcIi9zZGNhcmQvXCIgKyBkb2NOYW1lICsgXCIuemlwXCJcbiAgICAgICAgbGV0IGRlc3QgPSBcIi9zZGNhcmQvXCIgKyBkb2NOYW1lXG5cbiAgICAgICAgaHR0cC5nZXRGaWxlKGRvY1BhdGgsIHppcFBhdGgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgWmlwLnVuemlwKHppcFBhdGgsIGRlc3QpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudERvY1BhdGggPSBkZXN0ICsgJy8nICsgZG9jTmFtZSArICcuZG9jc2V0L0NvbnRlbnRzL1Jlc291cmNlcy9Eb2N1bWVudHMvJyArIHRoaXMuX29mZmljaWFsRG9jTGlzdFthcmdzLmluZGV4XS5kb2NXZWJJbmRleFxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fY3VycmVudERvY1BhdGgpXG4gICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICdkb2MtdmlldycsXG4gICAgICAgICAgICAgICAgYmFja3N0YWNrVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY05hbWU6IGRvY05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRvY1BhdGg6IHRoaXMuX2N1cnJlbnREb2NQYXRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5kdW1wKGUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGdldFBhdGhUb0luZGV4KGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncylcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnREb2NQYXRoXG4gICAgfVxuXG59Il19