
## Set up
1. Make sure you have `node`, `npm`, `yarn` installed
2. In the root directory, run `yarn install`

## Library
1. Next.js
2. Amplify
   1. Auth
   2. Hosting
   3. Storage (S3)
3. Styled component
4. Ant design
5. Chart.js

## Routes

Route | Params | Detail
--- | --- | ---
/ | | search products by keywords or images
/result | q, image | show search results
/wishlist | | show products on user's wishlist
/product/[id] | | show product details and price history
/signup | | sign up
/confirm | showHints, email | confirm sign up
/login | | log in