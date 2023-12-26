/**
 * The Boring JS
 * A simple and boring JavaScript code to help with boring things.
 *
 * @author: Rogerio Taques
 * @version: 1.0.0
 * @license: MIT
 */

'use strict';

(() => {
  const DM_STORAGE_KEY = 'darkModeOn';
  const THEME = Object.freeze({ DARK: 'dark', LIGHT: 'light' });

  const oppositeStatusLabel = (on) => (on ? 'OFF' : 'ON');

  const emit = {
    events: {},

    subscribe: (eventName, fn) => {
      emit.events[eventName] = emit.events[eventName] || [];
      emit.events[eventName].push(fn);
    },

    publish: (eventName, data) => {
      if (emit.events[eventName]) {
        emit.events[eventName].forEach((fn) => fn(data));
      }
    },
  };

  const modeChangeHandler = () => {
    const currentMode = html.getAttribute('data-mode');
    const darkModeOn = currentMode === THEME.DARK;

    html.setAttribute('data-mode', darkModeOn ? THEME.LIGHT : THEME.DARK);
    localStorage.setItem(DM_STORAGE_KEY, darkModeOn);

    triggers.forEach((trigger) => {
      trigger.innerHTML = `Turn dark-mode ${oppositeStatusLabel(!darkModeOn)}`;
    });
  };

  const userSetDarkModeOn = localStorage.getItem(DM_STORAGE_KEY);
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const triggers = document.querySelectorAll('[role="toggle"].theme-switcher');
  const html = document.querySelector('html');

  html.setAttribute(
    'data-mode',
    userSetDarkModeOn === 'true' || (!userSetDarkModeOn && prefersDarkScheme.matches) ? THEME.DARK : THEME.LIGHT
  );

  emit.subscribe('mode-changed', modeChangeHandler);

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      emit.publish('mode-changed');
    });
  });

  modeChangeHandler();
})();
