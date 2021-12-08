odoo.define("demo_custom_field_widget.main", function (require) {
  "use strict";

  var FieldEmail = require("web.basic_fields").FieldEmail;
  var fieldRegistry = require("web.field_registry");

  var FieldEmailCustom = FieldEmail.extend({
    customLabel: "",
    init: function () {
      this._super.apply(this, arguments);
      var customLabelValue = this.recordData[this.nodeOptions["customLabel"]];
      if (customLabelValue) {
        this.customLabel = customLabelValue;
      }
    },

    // zzz: OVERRIDE to make email field display LABEL<EMAIL ADDRESSS> in readonly mode
    _renderReadonly: function () {
      if (this.value) {
        var readonlyFormat = this.value;
        if (this.customLabel) {
          readonlyFormat = `${this.customLabel}<${this.value}>`;
        }

        this.el.innerHTML = "";
        this.el.classList.add("o_form_uri", "o_text_overflow");
        const anchorEl = Object.assign(document.createElement("a"), {
          text: readonlyFormat,
          href: `${this.prefix}:${this.value}`,
        });
        this.el.appendChild(anchorEl);
      }
    },
  });

  fieldRegistry.add("email-custom", FieldEmailCustom);
});
