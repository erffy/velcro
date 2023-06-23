import { AttachmentBuilder, BufferResolvable, AttachmentData } from "discord.js";
import { Stream } from "node:stream";

export default class Attachment extends AttachmentBuilder {
  public constructor(attachment: BufferResolvable | Stream, data?: AttachmentData);
};