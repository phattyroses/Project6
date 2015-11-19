/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function()
{
  /*  This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function()
  {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function()
    {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('urls are defined and not empty', function()
    {
      for (var i = 0, j = allFeeds.length; i < j; i++)
      {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    })
    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('names are defined and not empty', function()
    {
      for (var i = 0, j = allFeeds.length; i < j; i++)
      {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    })
  });
  describe('The menu', function()
  {
    /* A test that ensures the menu element is
     * hidden by default.
     */
    it('hidden by default', function()
      {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      })
      /* A test that ensures the menu changes
       * visibility when the menu icon is clicked.
       */
    it('changes visibility when clicked', function()
    {
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    })
  })
  /* A test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   */
  describe('Initial Entries', function()
  {
    beforeEach(function(done)
    {
      loadFeed(0, function()
      {
        done();
      });
    })
    it('should have an entry', function(done)
    {
      expect($('.feed').text()).not.toBe('');
      done();
    });
  });
  /* A test that ensures when a new feed is loaded and changes content when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * Remember, loadFeed() is asynchronous.
   */
  describe('New Feed Selection', function()
  {
    var first;
    var second;
    beforeEach(function(done)
    {
      loadFeed(0, function()
      {
        first = $('.feed').text();
        done();
      });
    });
    beforeEach(function(done)
    {
      loadFeed(1, function()
      {
        second = $('.feed').text();
        done();
      });
    });
    it('Loads new content', function(done)
    {
      expect(first).not.toEqual(second);
      done();
    })
  })
}());

