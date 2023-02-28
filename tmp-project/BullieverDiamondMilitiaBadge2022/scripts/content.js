// Endpoint used to fetch the diamond militia dashboard data
const ApiEndpoint = "https://www.plo4ox.com/tmp-project/BullieverDiamonMilitia2022/data/getBulliewards.json"

// Tag used to know whether a link as been check by the plugin or not
const isCheckedTag = "UNBullieverse_DM_isChecked";

// Different Ranks in the DiamondMilitia
const Rank = {
	Minuteman: { title: "Minuteman", score: 40 },
	Private: { title: "Private", score: 100 },
	Corporal: { title: "Corporal", score: 300 },
	Sergeant: { title: "Sergeant", score: 1000 },
  Lieutenant: { title: "Lieutenant", score: 3000 },
  Captain: { title: "Captain", score: 8000 },
  Major: { title: "Major", score: 15000 },
  Colonel: { title: "Colonel", score: 25000 },
  Brigadier: { title: "Brigadier", score: 40000 },
  General: { title: "General", score: 50000 }
}

// Get the diamond militia rank based on the given score
function getRank(score) {
  switch (true) {
    case (score >= Rank.General.score):
        return Rank.General;
    case (score >= Rank.Brigadier.score):
        return Rank.Brigadier;
    case (score >= Rank.Colonel.score):
        return Rank.Colonel;
    case (score >= Rank.Major.score):
        return Rank.Major;
    case (score >= Rank.Captain.score):
        return Rank.Captain;
    case (score >= Rank.Lieutenant.score):
        return Rank.Lieutenant;
    case (score >= Rank.Sergeant.score):
        return Rank.Sergeant;
    case (score >= Rank.Corporal.score):
        return Rank.Corporal;
    case (score >= Rank.Private.score):
        return Rank.Private;
    case (score >= Rank.Minuteman.score):
        return Rank.Minuteman;
    default:
        return undefined;
  }
}

// Fetch the diamond militia data
async function fetchDiamondMilitiaDataAsync() {
  let response = await fetch(ApiEndpoint);
  let data = await response.json();
  let militiaList = data["response"]["data"]
  for (var i = 0; i < militiaList.length; i++) {
    let userData = militiaList[i]
    militiaData[userData["twitterhandle"]] = getRank(userData["total_score"])
  }
  return militiaData;
}

// Get the rank image based on the given rank title
function getRankImg(rankTitle) {
  return "https://www.plo4ox.com/tmp-project/BullieverDiamonMilitia2022/images/rank/" + rankTitle + ".png"
}

// Create the badge element
function createBadgeElement(title, isOnHeader) {
	const badgecontainer = document.createElement("div");
	const badge = document.createElement("img");
	badge.src = getRankImg(title)
	badgecontainer.classList.add("diamondMilitiaBadgeContainer");

	// Base the class attached to the badge on the size of the profile image
	if (isOnHeader) {
		badge.classList.add("diamondMilitiaHeaderPhotoBadge");
	} else {
		badge.classList.add("diamondMilitiaPostPhotoBadge");
	}
	badgecontainer.append(badge);
	return badgecontainer;
}

// Check the current title of the page
// Return true if a change occured, false otherwise
var viewTitle = "Unknown";
function hasViewTitleChanged() {
	const currentTitle = document.querySelector("title");
	if (currentTitle !== undefined && currentTitle.innerHTML != viewTitle) {
		viewTitle = currentTitle.innerHTML;
		return true
	}
	return false
}

// Reset existing badges and flags
function resetExistingBadges() {
	// Delete all the existing custom badges
	const badges = document.querySelectorAll("div.diamondMilitiaBadgeContainer");
	badges.forEach((badge) => { badge.remove(); });
	// Reset all the links attached to a diamondMilitiaBadge
	const matches = document.querySelectorAll('a['+isCheckedTag+'=true][role="link"][hasDiamondMilitiaBadge=true]');
	matches.forEach((linkItem) => { linkItem.setAttribute(isCheckedTag, false); });
}

// Update the view with the diamond militia badge
function updateViewWithDiamondMilitiaBadge() {
  const matches = document.querySelectorAll('a:not(['+isCheckedTag+'=true])[role="link"]');

  matches.forEach((linkItem) => {
    if (linkItem.getAttribute(isCheckedTag) == true) { return; }
    linkItem.setAttribute(isCheckedTag, true);

		let imageMatches = linkItem.querySelectorAll("img");
		let image = imageMatches[0];
		if (image == undefined || imageMatches.length > 1 || !image.src.includes("/profile_images/")) {
			return;
		}

    const splittedUrl = new URL(linkItem.href).pathname.split('/');
    const twitterHandle = splittedUrl[1];
    if (militiaData[twitterHandle] !== undefined) {
			// Create and attach the diamond militia badge
      const badge = createBadgeElement(
				militiaData[twitterHandle].title,
				image.src.endsWith("400.jpg")
			);
      linkItem.parentElement.insertAdjacentElement("afterend", badge);
			linkItem.setAttribute("hasDiamondMilitiaBadge", true);
    }
  });
}

// All the militia data
var militiaData = {}

// Start by fetching the Diamond Militia data
fetchDiamondMilitiaDataAsync()

// Then check the current view every seconds to be sure to stay up-to-date
const interval = setInterval(function() {
	if (hasViewTitleChanged()) { resetExistingBadges() }
  updateViewWithDiamondMilitiaBadge()
}, 1000);
