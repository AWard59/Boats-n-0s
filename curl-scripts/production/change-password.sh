# TOKEN= OLD_PW= NEW_PW= sh curl-scripts/production/change-password.sh

curl "https://tic-tac-toe-api-production.herokuapp.com/change-password" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "passwords": {
      "old": "'"${OLD_PW}"'",
      "new": "'"${NEW_PW}"'"
    }
    }'

echo
