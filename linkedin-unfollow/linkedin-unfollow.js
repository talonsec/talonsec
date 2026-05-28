// LinkedIn Mass Unfollow Script
// Usage: Navigate to https://www.linkedin.com/mynetwork/network-manager/people-follow/followers/
// Open browser DevTools (F12 or Cmd+Option+J), paste this script in the Console tab, and run it.

(async () => {
  const DELAY = 2000; // ms between unfollows to avoid rate limiting

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function unfollowAll() {
    let totalUnfollowed = 0;

    while (true) {
      // Find all "Following" buttons on the page
      const buttons = [...document.querySelectorAll('button')].filter(
        btn => btn.textContent.trim() === 'Following'
      );

      if (buttons.length === 0) {
        // Scroll to load more
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(2000);

        // Check again after scroll
        const newButtons = [...document.querySelectorAll('button')].filter(
          btn => btn.textContent.trim() === 'Following'
        );

        if (newButtons.length === 0) {
          console.log(`Done! Unfollowed ${totalUnfollowed} people total.`);
          return;
        }
      }

      for (const btn of buttons) {
        btn.click();
        totalUnfollowed++;
        console.log(`Unfollowed ${totalUnfollowed} people...`);
        await sleep(DELAY);
      }

      // Scroll down to load more
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(2000);
    }
  }

  console.log('Starting mass unfollow...');
  await unfollowAll();
})();
