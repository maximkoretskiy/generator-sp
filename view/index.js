'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var BaseActions = require("./BaseActions")
var capitalize = function(name){
  return name[0].toUpperCase() + name.slice(1,name.length);
}

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('You called the view subgenerator with the argument ' + this.normalize_name + '.');

};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);
ViewGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [{
    type: 'list',
    name: 'viewType',
    message: 'Select viewType',
    choices:[
      { 'name':'widget', value:'widget' },
      { 'name':'layout', value:'layout' },
      { 'name':'modal', value:'modal' },
      { 'name':'page', value:'page' },
      { 'name':'collectionwidget', value:"list"}
    ],
    default: 'widget'
  }];
  this.prompt(prompts, function (props) {
    this.viewType = props.viewType;
    this.viewTypeList = this.viewType == "list";
    if(this.viewTypeList){
      this.normalize_name = capitalize(this.name) + "Item";
      this.normalize_name_list = capitalize(this.name) + "List";
      this.css_classname = (this.name + "_Item").toLowerCase();
      this.css_classname_list = (this.name + "_List").toLowerCase();
      this.collection_name = capitalize(this.name) + "Collection";
    }
    else {
      this.normalize_name_list = this.normalize_name = capitalize(this.name) + capitalize(this.viewType);
      this.css_classname_list = this.css_classname = (this.name + "_" + this.viewType).toLowerCase();
    }

    this.view_path = this.viewType;
    this.coffee_base = "_" + capitalize(this.viewType);

    cb();
  }.bind(this));
}

ViewGenerator.prototype.files = function files() {

  BaseActions.createView.call(
    this,
    this.view_path,
    this.normalize_name,
    this.normalize_name_list,
    this.viewType,
    this.viewTypeList,
    this.dest._base
  );
  //createView(this);

  /*
  if(this.viewTypeList){
    this.invoke("sp:collection",{
      args:[this.name]
    });
  }*/
};
