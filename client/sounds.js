const kick = {
	name: "kick",
	humanReadableName: "Kick",
	sounds: [
		'Bass-Drum-1.wav',
		'Bass-Drum-2.wav',
		'Bass-Drum-3.wav',
		'Boom-Kick.wav',
		'Deep-Kick.wav',
		'E-Mu-Proteus-FX-909-Kick.wav',
		'Electronic-Kick-1.wav',
		'Electronic-Kick-2.wav'
	]
};

const snare = {
	name: "snare",
	humanReadableName: "Snare",
	sounds: [
		'E-Mu-Proteus-FX-Wacky-Snare.wav',
		'Ensoniq-ESQ-1-Snare-2.wav',
		'Ensoniq-ESQ-1-Snare.wav',
		'Ensoniq-VFX-SD-Snare.wav',
		'Hip-Hop-Snare-1.wav',
		'Hip-Hop-Snare-2.wav',
		'Hip-Hop-Snare-3.wav'
	]
};

const closedHat = {
	name: "closed-hat",
	humanReadableName: "Closed Hat",
	sounds: [
		'Closed-Hi-Hat-1.wav',
		'Closed-Hi-Hat-2.wav',
		'Closed-Hi-Hat-3.wav',
		'Closed-Hi-Hat-4.wav',
		'Closed-Hi-Hat-5.wav',
		'Closed-Hi-Hat-6.wav',
		'Closed-Hi-Hat-7.wav',
		'Ensoniq-SQ-1-Closed-Hi-Hat.wav'
	]
};

const openHat = {
	name: "open-hat",
	humanReadableName: "Open Hat",
	sounds: [
		'Ensoniq-SQ-1-Open-Hi-Hat.wav',
		'Kawai-K1r-Open-Hi-Hat.wav',
		'Korg-M1-Open-Hi-Hat.wav',
		'Korg-N1R-Open-Hi-Hat.wav',
		'Korg-NS5R-Open-Hi-Hat.wav',
		'Korg-NS5R-Power-Open-Hi-Hat.wav',
		'M-Audio-Venom-Open-Hi-Hat.wav'
	]
};

const toms = {
	name: "toms",
	humanReadableName: "Toms",
	sounds: [
		'Electro-Tom.wav',
		'Electronic-Tom-1.wav',
		'Electronic-Tom-2.wav',
		'Electronic-Tom-3.wav',
		'Electronic-Tom-4.wav',
		'Ensoniq-ESQ-1-Hi-Mid-Synth-Tom.wav',
		'Ensoniq-ESQ-1-Hi-Synth-Tom.wav',
		'Ensoniq-ESQ-1-Low-Mid-Synth-Tom.wav',
		'Ensoniq-ESQ-1-Low-Synth-Tom.wav',
		'Floor-Tom-1.wav'
	]
};

const percussion = {
	name: "percussion",
	humanReadableName: "Percussion",
	sounds: [
		'Bamboo.wav',
		'Bottle.wav',
		'Clap-1.wav',
		'Clap-2.wav',
		'Clap-3.wav',
		'Cowbell-1.wav',
		'Doumbek-Doum.wav',
		'Hand-Drum.wav',
		'Kawai-K11-Sleigh-Bells.wav',
		'Korg-N1R-High-Wood-Block.wav'
	]
};

const sampleFx = {
	name: "sample-fx",
	humanReadableName: "Sample/FX",
	sounds: [
		'8-Bit-Noise-1.wav',
		'8-Bit-Noise-2.wav',
		'8-Bit-Noise-3.wav',
		'Casio-MT-600-Typhoon-Sound.wav',
		'Digital-Seashore.wav',
		'Flowing-Water.wav',
		'M-Audio-Venom-8Bit-Tremo-C4.wav',
		'M-Audio-Venom-Disintegr8-C3.wav'
	]
};

const synth = {
	name: "synth",
	humanReadableName: "Synth",
	sounds: [
		'Casio-MT-600-Fantasy-C3.wav',
		'Casio-MT-600-Koto-C5.wav',
		'Casio-MT-600-Synth-Bells-C3.wav',
		'Casio-MT-600-Synth-Celesta-C4.wav',
		'E-Mu-Proteus-FX-CosmoBel-C3.wav',
		'E-Mu-Proteus-FX-MusicBox-C4.wav'
	]
};

const availableSounds = {
	kick,
	snare,
	closedHat,
	openHat,
	toms,
	percussion,
	sampleFx,
	synth
};

export {availableSounds};
