import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <p style={{ textAlign: "justify" }}>
          Welcome to <strong>CINEFLEX</strong> your personal gateway to the
          world of cinema.
          <br />
          <br />
          At CINEFLEX, we believe movies are more than just entertainment
          they’re experiences, conversations, and reflections of who we are.
          That’s why we built a platform dedicated to helping film lovers
          explore, discover, and engage with cinema in meaningful ways.
          <br />
          <br />
          Whether you're looking for the latest box office sensations,
          critically acclaimed masterpieces, or nostalgic hidden gems, CINEFLEX
          brings it all together in one seamless space. Browse our curated
          "Movie of the Month", track your favorites in your Watch List, and
          explore rankings in our Box Office section.
          <br />
          <br />
          With smart search tools, rich movie details, and a space for community
          comments, CINEFLEX makes discovering and sharing movies easier and
          more enjoyable than ever. Join us as we celebrate the stories that
          move us.
        </p>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
