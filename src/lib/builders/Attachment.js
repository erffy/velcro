import { AttachmentBuilder } from "discord.js";

/**
 * @extends AttachmentBuilder
 */
export default class Attachment extends AttachmentBuilder {
  /**
   * Create new Attachment.
   * @param {import("discord.js").BufferResolvable | import("node:stream").Stream} attachment 
   * @param {import("discord.js").AttachmentData | ((attachment: Attachment) => unknown)} data
   * @constructor
   */
  constructor(attachment, data) {
    super(attachment, (typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };
};