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
      const status = trigger.querySelector('.status');
      if (status) status.innerHTML = oppositeStatusLabel(!darkModeOn);
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

  /* Tooltip Auto Positioning */

  const tooltips = document.querySelectorAll('.has-tooltip');

  const handleTooltip = () => {
    tooltips.forEach((tooltip) => {
      const curPosClassName = `${tooltip.classList}`.replace('has-tooltip', '').trim();

      tooltip.setAttribute('data-position', curPosClassName);

      tooltip.addEventListener('mouseenter', () => {
        const curPos = tooltip.getBoundingClientRect();
        const oriPos = tooltip.getAttribute('data-position');

        if (oriPos === 'has-tooltip--top' && Math.ceil(curPos.top - 55) <= 0) {
          tooltip.classList.replace('has-tooltip--top', 'has-tooltip--bottom');
        } else if (oriPos === 'has-tooltip--bottom' && Math.ceil(curPos.bottom + 55) >= window.innerHeight) {
          tooltip.classList.replace('has-tooltip--bottom', 'has-tooltip--top');
        } else if (oriPos === 'has-tooltip--left' && Math.ceil(curPos.left - 240) <= 0) {
          tooltip.classList.replace('has-tooltip--left', 'has-tooltip--right');
        } else if (oriPos === 'has-tooltip--right' && Math.ceil(curPos.right + 240) >= window.innerWidth) {
          tooltip.classList.replace('has-tooltip--right', 'has-tooltip--left');
        } else {
          // Reset to the original position
          tooltip.classList.remove('has-tooltip--top');
          tooltip.classList.remove('has-tooltip--right');
          tooltip.classList.remove('has-tooltip--bottom');
          tooltip.classList.remove('has-tooltip--left');
          tooltip.classList.add(oriPos);
        }
      });
    });
  };

  handleTooltip();
})();
