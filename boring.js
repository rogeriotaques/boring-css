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
  /* Dark Mode Toggle */

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

  /* Tool Tip Auto Positioning */

  const tooltips = document.querySelectorAll('.has-tooltip');

  const repositionTooltips = () => {
    tooltips.forEach((tooltip) => {
      const curPos = tooltip.getBoundingClientRect();
      const isOnTop = tooltip.classList.contains('has-tooltip--top');
      const isOnRight = tooltip.classList.contains('has-tooltip--right');
      const isAtBottom = tooltip.classList.contains('has-tooltip--bottom');
      const isOnLeft = tooltip.classList.contains('has-tooltip--left');

      if (isOnLeft && curPos.left <= 240) {
        tooltip.classList.add('has-tooltip--right');
        tooltip.classList.remove('has-tooltip--left');
      }

      if (isOnRight && curPos.right + 240 >= window.innerWidth) {
        tooltip.classList.add('has-tooltip--left');
        tooltip.classList.remove('has-tooltip--right');
      }

      if (isOnTop && curPos.top <= 50) {
        tooltip.classList.add('has-tooltip--bottom');
        tooltip.classList.remove('has-tooltip--top');
      }

      if (isAtBottom && curPos.bottom + 50 >= window.innerHeight) {
        tooltip.classList.add('has-tooltip--top');
        tooltip.classList.remove('has-tooltip--bottom');
      }
    });
  };

  window.addEventListener('resize', repositionTooltips);
  window.addEventListener('scroll', repositionTooltips);
})();
