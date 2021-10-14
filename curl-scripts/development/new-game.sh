# TOKEN=58661c96f41b7e8e7ee1a1145507feec sh curl-scripts/development/new-game.sh

curl "https://tic-tac-toe-api-development.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{}'

echo
