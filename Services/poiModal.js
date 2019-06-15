angular.module('london_app').service('ModalService', [function () {
    let self = this
       

    self.open = function() {
        document.body.style = "background-color: rgba(0,0,0,0.4);"
        document.getElementById('modal').style = "display: unset;"
    }

    self.close = function() {
        document.body.style = "background-color: white"
        document.getElementById('modal').style = "display: none;"
    }
}])