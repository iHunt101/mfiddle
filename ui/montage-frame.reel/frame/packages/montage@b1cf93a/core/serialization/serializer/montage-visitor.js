var Montage=require("montage").Montage,MontageSerializerModule=require("./montage-serializer"),PropertiesSerializer=require("./properties-serializer").PropertiesSerializer,SelfSerializer=require("./self-serializer").SelfSerializer,UnitSerializer=require("./unit-serializer").UnitSerializer,Visitor=require("mousse/serialization/visitor").Visitor,MontageVisitor=Montage.specialize.call(Visitor,{_MONTAGE_ID_ATTRIBUTE:{value:"data-montage-id"},_require:{value:null},_units:{value:null},_elements:{value:null},constructor:{value:function MontageVisitor(){}},initWithBuilderAndLabelerAndRequireAndUnits:{value:function(e,t,n,r){return Visitor.call(this,e,t),this._require=n,this._units=r,this._elements=[],this}},getTypeOf:{value:function(e){return"getInfoForObject"in e||"getInfoForObject"in e.constructor?"MontageObject":e.thisIsAReferenceCreatedByMontageSerializer?"MontageReference":"undefined"!=typeof Element&&Element.isElement(e)?"Element":void 0}},visitMontageReference:{value:function(e,t,n){this.builder.top.setProperty(n,t.reference)}},visitElement:{value:function(e,t,n){var r,i;if(i=t.getAttribute(this._MONTAGE_ID_ATTRIBUTE),!i)throw Error("Not possible to serialize a DOM element with no "+this._MONTAGE_ID_ATTRIBUTE+" assigned: "+t.outerHTML);r=this.builder.createElementReference(i),this.storeValue(r,t,n),this._elements.push(t)}},visitMontageObject:{value:function(e,t,n){this.isObjectSerialized(t)?this.serializeReferenceToMontageObject(e,t,n):this.handleMontageObject(e,t,n)}},handleMontageObject:{value:function(e,t,n){var r,i=this.builder.createCustomObject();this.setObjectSerialization(t,i),r=this.serializeMontageObject(e,t,i),r?this.serializeSubstituteObject(e,t,n,i,r):(i.setLabel(this.labeler.getObjectLabel(t)),this.builder.top.setProperty(n,i))}},serializeReferenceToMontageObject:{value:function(e,t,n){var r=this.labeler.getObjectLabel(t),i=this.builder.createObjectReference(r);this.builder.top.setProperty(n,i)}},serializeSubstituteObject:{value:function(e,t,n,r,i){var a,o,s,l;a=this.labeler.getObjectLabel(t),this.labeler.isUserDefinedLabel(a)?(o=this.labeler.getObjectLabel(i),this.labeler.setObjectLabel(i,a),this.builder.relabelReferences(o,a),l=this.getObjectSerialization(i),l&&(l.setLabel(a),this.labeler.isUserDefinedLabel(o)&&this.builder.createObjectReference(a).setLabel(o)),e.visit(i,n)):(e.visit(i,n),s=this.labeler.getObjectLabel(i),this.labeler.setObjectLabel(t,s),this.builder.relabelReferences(a,s))}},serializeMontageObject:{value:function(e,t,n){var r,i,a=this.builder.createObjectLiteral();return this.setObjectType(t,n),n.setProperty("properties",a),this.builder.push(n),"function"==typeof t.serializeSelf?(r=(new SelfSerializer).initWithMalkerAndVisitorAndObject(e,this,t,n),i=t.serializeSelf(r)):(this.setObjectProperties(e,t),this.setObjectCustomUnits(e,t)),this.builder.pop(),0===a.getPropertyNames().length&&n.clearProperty("properties"),i}},setObjectType:{value:function(e,t){var n=Montage.getInfoForObject(e).isInstance,r=this.getObjectLocationId(e),i=this.builder.createString(r);n?t.setProperty("prototype",i):t.setProperty("object",i)}},getObjectModuleId:{value:function(e){var t=Montage.getInfoForObject(e);return this._require.identify(t.moduleId,t.require)}},getObjectLocationId:{value:function(e){var t,n=this.getObjectModuleId(e),r=Montage.getInfoForObject(e),i=r.objectName;return t=MontageSerializerModule.MontageSerializer.getDefaultObjectNameForModuleId(n),t===i?n:n+"["+i+"]"}},setObjectProperties:{value:function(e,t){var n,r;r=this.builder.top.getProperty("properties"),this.builder.push(r),"function"==typeof t.serializeProperties?(n=(new PropertiesSerializer).initWithMalkerAndVisitorAndObject(e,this,t),t.serializeProperties(n)):this.setSerializableObjectProperties(e,t),this.builder.pop()}},setSerializableObjectProperties:{value:function(e,t){for(var n,r,i=Montage.getSerializablePropertyNames(t),a=i.length,o=0;a>o;o++)r=i[o],n=Montage.getPropertyAttribute(t,r,"serializable"),this.setProperty(e,r,t[r],n)}},hackIsReferenceAllowedForValue:{value:function(e){return"object"==typeof e&&null!=e&&!("undefined"!=typeof Element&&Element.isElement(e))}},setProperty:{value:function(e,t,n,r){var i;if("reference"===r&&this.hackIsReferenceAllowedForValue(n)){i=this.labeler.getObjectLabel(n);var a=this.builder.createObjectReference(i);this.builder.top.setProperty(t,a)}else e.visit(n,t)}},setObjectCustomUnits:{value:function(e,t){for(var n in this._units)this.setObjectCustomUnit(e,t,n)}},setObjectCustomUnit:{value:function(e,t,n){var r,i,a=this._units[n];a&&(i=(new UnitSerializer).initWithMalkerAndVisitorAndObject(e,this,t),r=a(i,t),null!=r&&e.visit(r,n))}},getExternalObjects:{value:function(){for(var e,t={},n=this.builder.getExternalReferences(),r=0;e=n[r];r++)t[e]=this.labeler.getObjectByLabel(e);return t}},getExternalElements:{value:function(){return this._elements}}});exports.MontageVisitor=MontageVisitor;