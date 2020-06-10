/* eslint-disable */
import moment from 'moment';
import Vue from 'vue';

/**
 * @File
 */
Vue.filter(
  'capitalize',
  val => `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`
);

Vue.filter('uppercase', val => (val ? val.toUpperCase() : ''));

Vue.filter('formatDate', date => {
  return moment(date).format('DD MMM YYYY');
});

Vue.filter('formatDateFromNow', date => {
  return moment(date).fromNow();
});

Vue.filter('formatDateTime', date => {
  return moment(date).format('h:mm:ss a');
});

Vue.directive('svg-image', {
  inserted(el, { value }) {
    el.innerHTML = atob(value.replace('data:image/svg+xml;base64,', ''));
  },
});

Vue.filter('array-join', (arr, separator = ', ') => {
  if (arr) {
    return arr.join(separator);
  }
  return '';
});
