// source: rebus/nftid/v1/tx.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
goog.object.extend(proto, google_api_annotations_pb);
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
goog.object.extend(proto, gogoproto_gogo_pb);
var rebus_nftid_v1_id_pb = require('../../../rebus/nftid/v1/id_pb.js');
goog.object.extend(proto, rebus_nftid_v1_id_pb);
var cosmos_base_v1beta1_coin_pb = require('../../../cosmos/base/v1beta1/coin_pb.js');
goog.object.extend(proto, cosmos_base_v1beta1_coin_pb);
goog.exportSymbol('proto.rebus.nftid.v1.MsgCreateIdRecord', null, global);
goog.exportSymbol('proto.rebus.nftid.v1.MsgCreateIdRecordResponse', null, global);
goog.exportSymbol('proto.rebus.nftid.v1.MsgMintNftId', null, global);
goog.exportSymbol('proto.rebus.nftid.v1.MsgMintNftIdResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rebus.nftid.v1.MsgMintNftId = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rebus.nftid.v1.MsgMintNftId, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.rebus.nftid.v1.MsgMintNftId.displayName = 'proto.rebus.nftid.v1.MsgMintNftId';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rebus.nftid.v1.MsgMintNftIdResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.rebus.nftid.v1.MsgMintNftIdResponse.displayName = 'proto.rebus.nftid.v1.MsgMintNftIdResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rebus.nftid.v1.MsgCreateIdRecord = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rebus.nftid.v1.MsgCreateIdRecord, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.rebus.nftid.v1.MsgCreateIdRecord.displayName = 'proto.rebus.nftid.v1.MsgCreateIdRecord';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rebus.nftid.v1.MsgCreateIdRecordResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.rebus.nftid.v1.MsgCreateIdRecordResponse.displayName = 'proto.rebus.nftid.v1.MsgCreateIdRecordResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.toObject = function(opt_includeInstance) {
  return proto.rebus.nftid.v1.MsgMintNftId.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.rebus.nftid.v1.MsgMintNftId} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgMintNftId.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nftType: jspb.Message.getFieldWithDefault(msg, 2, 0),
    organization: jspb.Message.getFieldWithDefault(msg, 3, ""),
    encryptionKey: jspb.Message.getFieldWithDefault(msg, 4, ""),
    metadataUrl: jspb.Message.getFieldWithDefault(msg, 5, ""),
    mintingFee: (f = msg.getMintingFee()) && cosmos_base_v1beta1_coin_pb.Coin.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rebus.nftid.v1.MsgMintNftId}
 */
proto.rebus.nftid.v1.MsgMintNftId.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.rebus.nftid.v1.MsgMintNftId;
  return proto.rebus.nftid.v1.MsgMintNftId.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rebus.nftid.v1.MsgMintNftId} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rebus.nftid.v1.MsgMintNftId}
 */
proto.rebus.nftid.v1.MsgMintNftId.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {!proto.rebus.nftid.v1.NftId} */ (reader.readEnum());
      msg.setNftType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganization(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEncryptionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setMetadataUrl(value);
      break;
    case 6:
      var value = new cosmos_base_v1beta1_coin_pb.Coin;
      reader.readMessage(value,cosmos_base_v1beta1_coin_pb.Coin.deserializeBinaryFromReader);
      msg.setMintingFee(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.rebus.nftid.v1.MsgMintNftId.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rebus.nftid.v1.MsgMintNftId} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgMintNftId.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNftType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getOrganization();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEncryptionKey();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMetadataUrl();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getMintingFee();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      cosmos_base_v1beta1_coin_pb.Coin.serializeBinaryToWriter
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional NftId nft_type = 2;
 * @return {!proto.rebus.nftid.v1.NftId}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getNftType = function() {
  return /** @type {!proto.rebus.nftid.v1.NftId} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.rebus.nftid.v1.NftId} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.setNftType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string organization = 3;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getOrganization = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.setOrganization = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string encryption_key = 4;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getEncryptionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.setEncryptionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string metadata_url = 5;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getMetadataUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.setMetadataUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional cosmos.base.v1beta1.Coin minting_fee = 6;
 * @return {?proto.cosmos.base.v1beta1.Coin}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.getMintingFee = function() {
  return /** @type{?proto.cosmos.base.v1beta1.Coin} */ (
    jspb.Message.getWrapperField(this, cosmos_base_v1beta1_coin_pb.Coin, 6));
};


/**
 * @param {?proto.cosmos.base.v1beta1.Coin|undefined} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
*/
proto.rebus.nftid.v1.MsgMintNftId.prototype.setMintingFee = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.rebus.nftid.v1.MsgMintNftId} returns this
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.clearMintingFee = function() {
  return this.setMintingFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.rebus.nftid.v1.MsgMintNftId.prototype.hasMintingFee = function() {
  return jspb.Message.getField(this, 6) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.rebus.nftid.v1.MsgMintNftIdResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.rebus.nftid.v1.MsgMintNftIdResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    idRecord: (f = msg.getIdRecord()) && rebus_nftid_v1_id_pb.IdRecord.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rebus.nftid.v1.MsgMintNftIdResponse}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.rebus.nftid.v1.MsgMintNftIdResponse;
  return proto.rebus.nftid.v1.MsgMintNftIdResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rebus.nftid.v1.MsgMintNftIdResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rebus.nftid.v1.MsgMintNftIdResponse}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new rebus_nftid_v1_id_pb.IdRecord;
      reader.readMessage(value,rebus_nftid_v1_id_pb.IdRecord.deserializeBinaryFromReader);
      msg.setIdRecord(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.rebus.nftid.v1.MsgMintNftIdResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rebus.nftid.v1.MsgMintNftIdResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdRecord();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      rebus_nftid_v1_id_pb.IdRecord.serializeBinaryToWriter
    );
  }
};


/**
 * optional IdRecord id_record = 1;
 * @return {?proto.rebus.nftid.v1.IdRecord}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.getIdRecord = function() {
  return /** @type{?proto.rebus.nftid.v1.IdRecord} */ (
    jspb.Message.getWrapperField(this, rebus_nftid_v1_id_pb.IdRecord, 1));
};


/**
 * @param {?proto.rebus.nftid.v1.IdRecord|undefined} value
 * @return {!proto.rebus.nftid.v1.MsgMintNftIdResponse} returns this
*/
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.setIdRecord = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.rebus.nftid.v1.MsgMintNftIdResponse} returns this
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.clearIdRecord = function() {
  return this.setIdRecord(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.rebus.nftid.v1.MsgMintNftIdResponse.prototype.hasIdRecord = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.toObject = function(opt_includeInstance) {
  return proto.rebus.nftid.v1.MsgCreateIdRecord.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecord} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nftType: jspb.Message.getFieldWithDefault(msg, 2, 0),
    organization: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecord}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.rebus.nftid.v1.MsgCreateIdRecord;
  return proto.rebus.nftid.v1.MsgCreateIdRecord.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecord} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecord}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {!proto.rebus.nftid.v1.NftId} */ (reader.readEnum());
      msg.setNftType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganization(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.rebus.nftid.v1.MsgCreateIdRecord.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecord} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNftType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getOrganization();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecord} returns this
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional NftId nft_type = 2;
 * @return {!proto.rebus.nftid.v1.NftId}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.getNftType = function() {
  return /** @type {!proto.rebus.nftid.v1.NftId} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.rebus.nftid.v1.NftId} value
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecord} returns this
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.setNftType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string organization = 3;
 * @return {string}
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.getOrganization = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecord} returns this
 */
proto.rebus.nftid.v1.MsgCreateIdRecord.prototype.setOrganization = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.rebus.nftid.v1.MsgCreateIdRecordResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    idRecord: (f = msg.getIdRecord()) && rebus_nftid_v1_id_pb.IdRecord.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.rebus.nftid.v1.MsgCreateIdRecordResponse;
  return proto.rebus.nftid.v1.MsgCreateIdRecordResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new rebus_nftid_v1_id_pb.IdRecord;
      reader.readMessage(value,rebus_nftid_v1_id_pb.IdRecord.deserializeBinaryFromReader);
      msg.setIdRecord(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.rebus.nftid.v1.MsgCreateIdRecordResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIdRecord();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      rebus_nftid_v1_id_pb.IdRecord.serializeBinaryToWriter
    );
  }
};


/**
 * optional IdRecord id_record = 1;
 * @return {?proto.rebus.nftid.v1.IdRecord}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.getIdRecord = function() {
  return /** @type{?proto.rebus.nftid.v1.IdRecord} */ (
    jspb.Message.getWrapperField(this, rebus_nftid_v1_id_pb.IdRecord, 1));
};


/**
 * @param {?proto.rebus.nftid.v1.IdRecord|undefined} value
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse} returns this
*/
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.setIdRecord = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.rebus.nftid.v1.MsgCreateIdRecordResponse} returns this
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.clearIdRecord = function() {
  return this.setIdRecord(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.rebus.nftid.v1.MsgCreateIdRecordResponse.prototype.hasIdRecord = function() {
  return jspb.Message.getField(this, 1) != null;
};


goog.object.extend(exports, proto.rebus.nftid.v1);
