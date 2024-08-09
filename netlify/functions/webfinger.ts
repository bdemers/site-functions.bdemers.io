import { Handler } from "@netlify/functions";

const resourceNames = ['acct:bdemers@bdemers.io', 'acct:@bdemers@bdemers.io']

const bdemersWebFingerBody = JSON.stringify({
  "subject": "acct:bdemers@mastodon.social",
  "aliases": [
    "https://mastodon.social/@bdemers",
    "https://mastodon.social/users/bdemers"
  ],
  "links": [{
	  "href": "https://mastodon.social/@bdemers",
	  "rel": "http://webfinger.net/rel/profile-page",
	  "type": "text/html"
    },{
      "href": "https://mastodon.social/users/bdemers",
	  "rel": "self",
	  "type": "application/activity+json"
    },{
	  "rel": "http://ostatus.org/schema/1.0/subscribe",
	  "template": "https://mastodon.social/authorize_interaction?uri={uri}"
    }
  ]
});

const handler: Handler = async (event, context) => {
  if (resourceNames.includes(event.queryStringParameters.resource)) {
    return {
      statusCode: 200,
      multiValueHeaders: { 
        "Content-Type": ["application/jrd+json; charset=utf-8"],
        "Cache-Control": ["max-age=86400, s-maxage=86400"]
      },
      body: bdemersWebFingerBody
    };  
  }

    return Response.redirect("https://fed.brid.gy/.well-known/webfinger");
};

export { handler };