# TOKEN= OLD_PW= NEW_PW= sh curl-scripts/development/change-password.sh

curl "https://tic-tac-toe-api-development.herokuapp.com/change-password" \
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
