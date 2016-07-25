/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Using a loop verify that each feed entry has a defined url
        it('URLs are defined', function() {
          for (let i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).not.toBe(undefined);
            expect(allFeeds[i].url).not.toBe("");
          };
        });

         // Using a loop verify that each feed entry has a name defined
         it('names are defined', function() {
           for (let i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).not.toBe(undefined);
             expect(allFeeds[i].name).not.toBe("");
           };
         });
    });


    describe('The Menu', function() {

      var body = $('body');
      // Tests to verify if the menu-hidden class is applied by default to the body
      it('Menu Element is Hidden by default', function() {
        expect(body.hasClass('menu-hidden')).toBe(true);
      });

      // Tests to verify that when the menu icon is clicked the menu-hidden class is removed or added
      it('Menu Element has been shown or hidden on click', function() {
        var icon = $('.icon-list');
        icon.trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(false);
        icon.trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(true);
      });

    });

    describe('Initial Entries', function() {
      // Loads the asynchronus call in the loadFeed function to verify the length if more than 0 entries
      beforeEach(function(done) {
        loadFeed(1, done);
      });

      it('Feed Div has at least one entry within it', function() {
        expect($('.entry-link').length).toBeGreaterThan(0);
      });

    });

    describe('New Feed Selection', function() {
      // Loads the async call in the loadFeed function with 2 entries
      // stores first feed entry as html then calls loadFeed to replace the current entry
      beforeEach(function(done) {
        loadFeed(2, function() {
          html = $('.feed').html();
          loadFeed(1, done);
        });
      });

      // Verifies that the HTML content of the feed has changed from the first
      // feed to the new feed content
      it('New Feed loaded content changes', function() {
        expect($('.feed').html()).not.toBe(html);
      });

    });

}());
