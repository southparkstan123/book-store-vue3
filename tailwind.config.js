/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/views/**/*.{html,html.erb,erb}',
    './app/javascript/src/**/*.{js,ts,vue}',
  ],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        'info': 'var(--color-info)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'danger': 'var(--color-danger)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'light': 'var(--color-light)',
        'dark': 'var(--color-dark)',
        'muted': 'var(--color-muted)',
        'navbar': 'var(--color-navbar)',
        'navbar-submenu': 'var(--color-navbar-submenu)',
        'menu-brand': 'var(--color-menu-brand)',
        'menu-item': 'var(--color-menu-item)',
        'menu-button': 'var(--color-menu-button)',
        'table': 'var(--color-table)',
        'table-text': 'var(--color-table-text)',
        'table-title-1': 'var(--color-table-title-1)',
        'table-title-2': 'var(--color-table-title-2)',
        'table-header': 'var(--color-table-header)',
        'table-body-1': 'var(--color-table-body-1)',
        'table-body-2': 'var(--color-table-body-2)',
        'table-footer': 'var(--color-table-footer)',
        'table-footer-text': 'var(--color-table-footer-text)'
      },
    }
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}