import Vue from 'vue'

Vue.filter('truncate', function(value, limit) {
    return value.length >= limit ? `${value.substring(0, limit)}...` : value
})

Vue.filter('language', function(value) {
    return value == 'en' ? 'us' : value
})
