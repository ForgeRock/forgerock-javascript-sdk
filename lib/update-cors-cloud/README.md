# update-cors-cloud

This is a github action that will update a cloud tenant with urls for the purposes of preview environments. A preview environment will generate a unique url based on a number of variables, like a pr number, which will change the origin.

The cloud tenant cors configuration needs to know about the url's exact structure so that it can pass cors.
