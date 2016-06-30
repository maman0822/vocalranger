require.config({
    baseUrl: 'src',
    paths: {
        "knockout": '/scripts/knockout-3.4.0',
        "jquery": '/scripts/jquery-3.0.0'
    }
});

require(['./main']);
