"use strict";

import {
  EventEmitter
}
from 'events';

import {
  inherits
}
from 'util';

import {
  h
}
from 'virtual-dom';

import ace from './ace';

inherits(Editor, EventEmitter);

function Editor(app) {

  this.app = app;

}

Editor.prototype.render = function(model) {

  this.app.on('rendered', () => {

    const editor = ace(this, {
      theme: 'monokai',
      mode: 'css'
    }, 'ui-subcss-editor');

    editor.getSession().setUseWrapMode(true);

    this.ace = editor.getSession().getDocument();

    this.editor = editor;

    this.setCommands(editor);

  });

  return h('#ui-subcss-editor', {
    key: 'ace'
  });

};

Editor.prototype.setCommands = function(editor) {

  const bindKey = (win, mac) => ({win, mac});

  editor.commands.addCommand({
      name: "togglePlay",
      bindKey: bindKey("Alt-SPACE", "Alt-SPACE"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.togglePlay();

      }
  });

  editor.commands.addCommand({
      name: "toggleFullscreen",
      bindKey: bindKey("Alt-F", "Alt-F"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.toggleFullscreen();

      }
  });

  editor.commands.addCommand({
      name: "toggleCaptions",
      bindKey: bindKey("Alt-C", "Alt-C"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.toggleCaptions();

      }
  });

  editor.commands.addCommand({
      name: "forward 1 second",
      bindKey: bindKey("Alt-Q", "Alt-Q"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.embed ? player.seek(parseInt(player.media.currentTime)+1) : player.forward(1);

      }
  });

  editor.commands.addCommand({
      name: "rewind 1 second",
      bindKey: bindKey("Alt-Shift-Q", "Alt-Shift-Q"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.embed ? player.seek(parseInt(player.media.currentTime)-1) : player.rewind(1);

      }
  });

  editor.commands.addCommand({
      name: "forward 10 seconds",
      bindKey: bindKey("Alt-W", "Alt-W"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

        player.embed ? player.seek(parseInt(player.media.currentTime)+10) : player.forward(10);

      }
  });

  editor.commands.addCommand({
      name: "rewind 10 seconds",
      bindKey: bindKey("Alt-Shift-W", "Alt-Shift-W"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

        player.embed ? player.seek(parseInt(player.media.currentTime)-10) : player.rewind(10);

      }
  });

  editor.commands.addCommand({
      name: "forward 60 seconds",
      bindKey: bindKey("Alt-E", "Alt-E"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.embed ? player.seek(parseInt(player.media.currentTime)+60) : player.forward(60);

      }
  });

  editor.commands.addCommand({
      name: "rewind 60 seconds",
      bindKey: bindKey("Alt-Shift-E", "Alt-Shift-E"),
      exec: editor => {

          const player = this.ace.player;

          if(!player) return;

          player.embed ? player.seek(parseInt(player.media.currentTime)-60) : player.rewind(60);

      }
  });

};

Editor.prototype.getText = function(model) {

  return this.ace.getValue();

};

Editor.prototype.setText = function(text) {

  return this.ace.setValue(text);

};

Editor.prototype.setPlayer = function(player) {

  this.ace.player = player;

};

Editor.prototype.setFocus = function() {

  this.editor.focus();

};

export
default Editor;
