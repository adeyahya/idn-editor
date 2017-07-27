import React from 'react';
import { Entity } from 'draft-js';

export default ({ block }) => {
  const imgContent = Entity.get(block.getEntityAt(0)).data.src;
  return (
		<figure>
			<img src={imgContent} alt="" />
			<figcaption>caption here</figcaption>
		</figure>
  )
};