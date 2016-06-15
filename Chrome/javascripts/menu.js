<div id="iplug-menu" style="display: none">
    <div class="header">
        <span class="title">iPlug Menu</span>
        <div class="divider"></div>
    </div>
    <div class="iplug-menu-autowoot iplug-container">
        <div id="visuals" class="subcontainer">
            <i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i>
            <div class="noitem">
                <span class="subtitle">Visual Options</span>
            </div>
            <div id="youtubevideodisabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|youtubevideodisabled'] + '"></i>
                <span>Hide Youtube Video</span>
            </div>
            <div id="playbackborder" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|playbackborder'] + '"></i>
                <span>Hide Playback Border</span>
            </div>
            <div id="curateenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|curateenabled'] + '"></i>
                <span>Show Vote Buttons On Default Position</span>
            </div>
            <div id="roomnamedisabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|roomnamedisabled'] + '"></i>
                <span>Hide room name & info</span>
            </div>
            <div id="topwootenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topwootenabled'] + '"></i>
                <span>Show Woot Button In Top Bar</span>
            </div>
            <div id="topgrabenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topgrabenabled'] + '"></i>
                <span>Show Grab Button In Top Bar</span>
            </div>
            <div id="topmehenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topmehenabled'] + '"></i>
                <span>Show Meh Button In Top Bar</span>
            </div>
            <div id="topdlenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topdlenabled'] + '"></i>
                <span>Show download to mp3 button in top bar</span>
            </div>
            <div id="topskipenabled" class="item item-iplug">
                <i class="icon icon-check-blue" style="display: ' + localStorage['iplug|topskipenabled'] + '"></i>
                <span>Show Skip Button In Top Bar</span>
			</div>
			<div id="waitlistdisabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|waitlistdisabled'] + '"></i>
				<span>Hide Waitlist Join Button</span>
			</div>
			<div id="audiencedisabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|audiencedisabled'] + '"></i>
				<span>Hide Audience</span>
			</div>
			<div id="djdisabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|djdisabled'] + '"></i>
				<span>Hide DJ</span>
			</div>
			<div id="autohideplaybackcontrolsenabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autohideplaybackcontrolsenabled'] + '"></i>
				<span>Autohide Playback Controls (Fullscreen)</span>
			</div>
			<div id="backgroundcardselected" style="cursor: pointer;">' + cardBuilder(localStorage['iplug|currentBackground']) + '</div>
		</div>
		<div id="autowoot" class="subcontainer">
			<i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i>
			<div id="autowootenabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootenabled'] + '"></i>
				<span class="subtitle">Autowoot</span>
			</div>
			<div id="autowootdelay" class="slider">' + { block: ' 
				<div class="titlecontainer min">
					<span class="title">Autowoot Minimum Delay (Seconds)</span>
					<span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span>
				</div>
				<div class="titlecontainer max">
					<span class="title" style="display: inline">Autowoot Maximum Delay (Seconds)</span>
					<span class="value" style="display: inline">' + ((localStorage["iplug|autowootdelaymax"] / 10).toFixed(1)) + 's</span>
				</div>', none: ' 
				<div class="titlecontainer min">
					<span class="title">Autowoot Delay (Seconds)</span>
					<span class="value">' + ((localStorage['iplug|autowootdelaymin'] / 10).toFixed(1)) + 's</span>
				</div>
				<div class="titlecontainer max">
					<span class="title" style="display: none"></span>
					<span class="value" style="display: none">' + ((localStorage['iplug|autowootdelaymax'] / 10).toFixed(1)) + 's</span>
				</div>' }[localStorage['iplug|autowootdelayrandom']] + ' 
				<div class="counts">
					<span class="count">0s</span>
					<span class="count">10s</span>
					<span class="count">20s</span>
					<span class="count">30s</span>
					<span class="stretch"></span>
				</div>
				<div class="barcontainer">
					<div class="bar background"></div>
					<div class="bar selected" style="left: ' + (7 + parseInt(localStorage['iplug|autowootdelaymin'])) + 'px; width: ' + (parseInt(localStorage['iplug|autowootdelaymax']) - parseInt(localStorage['iplug|autowootdelaymin'])) + 'px"></div>
					<div class="hit"></div>
					<div class="circle" style="left: ' + localStorage['iplug|autowootdelaymin'] + 'px;"></div>
					<div class="circle" style="left: ' + localStorage['iplug|autowootdelaymax'] + 'px;"></div>
				</div>
			</div>
			<div id="autowootdelayrandom" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autowootdelayrandom'] + '"></i>
				<span>Advanced Autowoot Timing</span>
			</div>
		</div>
		<div class="subcontainer" id="chatoptions">
			<i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i>
			<div class="noitem">
				<span class="subtitle">Chat Options</span>
			</div>
			<div class="item item-iplug" id="imagesenabled">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|imagesenabled'] + '"></i>
				<span>Convert image links</span>
			</div>
			<div class="item item-iplug" id="videosenabled">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|videosenabled'] + '"></i>
				<span>Convert video links</span>
			</div>
		</div>
		<div id="misc" class="subcontainer">
			<i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i>
			<div class="noitem">
				<span class="subtitle">Misc Options</span>
			</div>
			<div id="autojoinenabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|autojoinenabled'] + '"></i>
				<span>Autojoin</span>
			</div>
			<div id="listgrabmehenabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|listgrabmehenabledenabled'] + '"></i>
				<span>List grabs & mehs</span>
			</div>
		</div>
		<div id="scvisuals" class="subcontainer">
			<i class="iplug-collapse icon icon-arrow-up" style="text-indent: 0px"></i>
			<div id="scvisualsenabled" class="item item-iplug">
				<i class="icon icon-check-blue" style="display: ' + localStorage['iplug|scvisualsenabled'] + '"></i>
				<span class="subtitle">Alternative Soundcloud Visuals</span>
			</div>
			<div id="visualsstyle" class="noitem centerall" style="width: 300px;">
				<span style="font-weight: normal; color: #fff">Style ' + (parseInt(localStorage['iplug|scvisualsstyle']) + 1) + '</span>
				<span> - change Style</span>
			</div>
			<div id="visuals1" style="' + ((localStorage['iplug|scvisualsstyle'] === '1') ? '' : 'height: 0px; opacity: 0') + '">
				<div class="settings">
					<div class="noitem delete" style="display: none">
						<span style="display: ' + ((COLORS.length > 1) ? " block; cursor: pointer " : "none; cursor: default ") + '">Delete</span>
					</div>
					<div class="colorpicker" style="display: none">
						<div id="decolorred" class="slider">
							<div class="barcontainer">
								<div class="bar background"></div>
								<div class="hit"></div>
								<div class="circle" style="left: 0px; background-color: #f00"></div>
							</div>
						</div>
						<div id="decolorgreen" class="slider">
							<div class="barcontainer">
								<div class="bar background"></div>
								<div class="hit"></div>
								<div class="circle" style="left: 0px; background-color: #0f0"></div>
							</div>
						</div>
						<div id="decolorblue" class="slider">
							<div class="barcontainer">
								<div class="bar background"></div>
								<div class="hit"></div>
								<div class="circle" style="left: 0px; background-color: #00f"></div>
							</div>
						</div>
						<div id="decolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div>
					</div>
				</div>
				<div class="nodecontainer" style="height: ' + (-19 * Math.floor(-COLORS.length / 16)) + 'px">
					<div class="node cross">
						<div class="horizontal"></div>
						<div class="vertical"></div>
					</div>
					<div class="node" style="background-color: ' + COLORS.join('"></div>
					<div class="node" style="background-color: ') + '"></div>
				</div>
			</div>
			<div id="visuals0" style="' + ((localStorage['iplug|scvisualsstyle'] === '0') ? '' : 'height: 0px; opacity: 0') + '">
				<div id="scvisualsbars" class="slider">
					<div class="counts">
						<span class="count">Fast</span>
						<span class="count">Fancy</span>
						<span class="stretch"></span>
					</div>
					<div class="barcontainer">
						<div class="bar background"></div>
						<div class="hit"></div>
						<div class="circle" style="left: ' + localStorage['iplug|scvisualsbarsmin'] + 'px;"></div>
					</div>
				</div>
				<div id="sccolorstring" class="gradientpicker">
					<div class="settings">
						<div class="noitem delete">
							<span>Delete</span>
						</div>
						<div class="colorpicker" style="display: none">
							<div id="sccolorred" class="slider">
								<div class="barcontainer">
									<div class="bar background"></div>
									<div class="hit"></div>
									<div class="circle" style="left: 0px; background-color: #f00"></div>
								</div>
							</div>
							<div id="sccolorgreen" class="slider">
								<div class="barcontainer">
									<div class="bar background"></div>
									<div class="hit"></div>
									<div class="circle" style="left: 0px; background-color: #0f0"></div>
								</div>
							</div>
							<div id="sccolorblue" class="slider">
								<div class="barcontainer">
									<div class="bar background"></div>
									<div class="hit"></div>
									<div class="circle" style="left: 0px; background-color: #00f"></div>
								</div>
							</div>
							<div id="sccolorcolor" class="colorblock" style="background-color: rgb(0, 0, 0);"></div>
						</div>
					</div>
					<div id="scgradientslider" class="slider">
						<div class="barcontainer gradient">
							<div class="bar background" style="' + setGradient(colorscheme) + '"></div>
							<div class="hit"></div>' + colorDom(colorscheme) + '
						</div>
					</div>
					<div class="noitem centerall">
						<span>Recenter all markers</span>
					</div>
				</div>
			</div>
			<div class="unavailable"></div>
		</div>
	</div>
	<div id="backgroundcarddeckcontainer" style="display: none;">
		<div id="backgroundcarddeck">' + backgroundcarddeck + '</div>
	</div>
</div>