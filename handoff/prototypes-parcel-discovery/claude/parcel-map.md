# Parcel map

The spatial half of the workspace — an Esri World Topographic basemap over the Crook County / Ochoco area of the Deschutes basin, with every parcel plotted as a Noria-blue circle marker.

## Key decisions
- Leaflet with the Esri World_Topo_Map tile service ({z}/{y}/{x}); circle markers (primary-blue stroke, lighter blue fill).
- Server-rendered parcels reach the client through a JSON data island (the client script cannot read Astro.props); fitBounds tightens to whatever subset was passed.
- A ResizeObserver calls invalidateSize so the map stays correctly sized through sidebar collapse and split-view changes.

## Gotchas
- Leaflet sets high z-indexes on its panes/controls (up to ~1000); the map box uses `isolation: isolate` to confine them so they never paint over the page's dropdown panels.
- circleMarker colors are literals — Leaflet's canvas paint ignores CSS custom properties.

## Done when
- Basemap + markers render and fit the parcels in view.
- The map resizes cleanly; its controls never cover an open dropdown.

## Markup
```html
<div class="noria-parcel-map" style="height: 100%">
  <div
    id="noria-parcel-map-mount"
    class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    tabindex="0"
  >
    <div
      class="leaflet-pane leaflet-map-pane"
      style="transform: translate3d(0px, 0px, 0px)"
    >
      <div class="leaflet-pane leaflet-tile-pane">
        <div class="leaflet-layer" style="z-index: 1; opacity: 1">
          <div
            class="leaflet-tile-container leaflet-zoom-animated"
            style="z-index: 19; transform: translate3d(148px, 148px, 0px) scale(1)"
          >
            <img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/184/83"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(-174px, -274px, 0px);
                opacity: 1;
              "
            /><img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/184/84"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(82px, -274px, 0px);
                opacity: 1;
              "
            /><img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/185/83"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(-174px, -18px, 0px);
                opacity: 1;
              "
            /><img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/185/84"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(82px, -18px, 0px);
                opacity: 1;
              "
            /><img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/186/83"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(-174px, 238px, 0px);
                opacity: 1;
              "
            /><img
              alt=""
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/9/186/84"
              class="leaflet-tile leaflet-tile-loaded"
              style="
                width: 256px;
                height: 256px;
                transform: translate3d(82px, 238px, 0px);
                opacity: 1;
              "
            />
          </div>
        </div>
      </div>
      <div class="leaflet-pane leaflet-overlay-pane">
        <svg
          pointer-events="none"
          class="leaflet-zoom-animated"
          width="550"
          height="576"
          viewBox="-46 -48 550 576"
          style="transform: translate3d(-46px, -48px, 0px)"
        >
          <g>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M148,323a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M127,315a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M137,274a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M105,270a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M179,276a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M144,285a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M108,311a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M116,257a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M103,338a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M164,297a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M164,299a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M109,323a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M378,324a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M356,268a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M302,336a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M325,326a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M336,334a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M325,279a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M305,258a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M362,295a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M377,315a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M368,248a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M351,272a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M331,286a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M336,307a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M350,273a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M355,274a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M325,284a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M341,314a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M185,80a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M137,138a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M135,69a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M178,152a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M161,91a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M145,98a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M161,72a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M174,151a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M181,89a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M193,114a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M167,132a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M118,146a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M164,65a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M191,140a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M127,118a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M311,249a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M303,276a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M293,292a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M295,259a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M335,310a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M312,278a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M288,280a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M292,320a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M287,314a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M332,318a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M98,406a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M93,385a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M90,339a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M113,410a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M138,386a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M89,416a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M117,374a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M100,375a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M73,368a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
            <path
              class="leaflet-interactive"
              stroke="#235069"
              stroke-opacity="1"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="#3e92b9"
              fill-opacity="0.7"
              fill-rule="evenodd"
              d="M70,373a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 "
            ></path>
          </g>
        </svg>
      </div>
      <div class="leaflet-pane leaflet-shadow-pane"></div>
      <div class="leaflet-pane leaflet-marker-pane"></div>
      <div class="leaflet-pane leaflet-tooltip-pane"></div>
      <div class="leaflet-pane leaflet-popup-pane"></div>
      <div
        class="leaflet-proxy leaflet-zoom-animated"
        style="transform: translate3d(21503.3px, 47470.2px, 0px) scale(256)"
      ></div>
    </div>
    <div class="leaflet-control-container">
      <div class="leaflet-top leaflet-left">
        <div class="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            class="leaflet-control-zoom-in"
            href="#"
            title="Zoom in"
            role="button"
            aria-label="Zoom in"
            aria-disabled="false"
            ><span aria-hidden="true">+</span></a
          ><a
            class="leaflet-control-zoom-out"
            href="#"
            title="Zoom out"
            role="button"
            aria-label="Zoom out"
            aria-disabled="false"
            ><span aria-hidden="true">−</span></a
          >
        </div>
      </div>
      <div class="leaflet-top leaflet-right"></div>
      <div class="leaflet-bottom leaflet-left"></div>
      <div class="leaflet-bottom leaflet-right">
        <div class="leaflet-control-attribution leaflet-control">
          <a
            href="https://leafletjs.com"
            title="A JavaScript library for interactive maps"
            ><svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              class="leaflet-attribution-flag"
            >
              <path fill="#4C7BE1" d="M0 0h12v4H0z"></path>
              <path fill="#FFD500" d="M0 4h12v3H0z"></path>
              <path fill="#E0BC00" d="M0 7h12v1H0z"></path>
            </svg>
            Leaflet</a
          >
          <span aria-hidden="true">|</span> Tiles © Esri
        </div>
      </div>
    </div>
  </div>
  <!-- Server → client bridge: the parcels prop, serialized for the Leaflet
       script below (is:inline keeps Astro from trying to bundle JSON as JS). -->
  <script id="noria-parcel-map-data" type="application/json">
    [
      {
        "apn": "1321720000773",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 175.8,
        "lat": 44.212007370844496,
        "lng": -121.14814307142808,
        "evapotranspiration": 325.9,
        "precipitation": 570.6
      },
      {
        "apn": "1333170000688",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 120.5,
        "lat": 44.22698760350886,
        "lng": -121.20586829364846,
        "evapotranspiration": 204.6,
        "precipitation": 308.1
      },
      {
        "apn": "1334330000314",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 238.7,
        "lat": 44.30904754280024,
        "lng": -121.17971392600771,
        "evapotranspiration": 401,
        "precipitation": 694.8
      },
      {
        "apn": "1338700000802",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 67.6,
        "lat": 44.31586548602755,
        "lng": -121.26628176515575,
        "evapotranspiration": 121.1,
        "precipitation": 179.1
      },
      {
        "apn": "1339600000790",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 43.3,
        "lat": 44.30416953591087,
        "lng": -121.06318939999043,
        "evapotranspiration": 86.4,
        "precipitation": 172.5
      },
      {
        "apn": "1339760000679",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 235.6,
        "lat": 44.28617233266698,
        "lng": -121.15973857469832,
        "evapotranspiration": 391.5,
        "precipitation": 757
      },
      {
        "apn": "1340200000696",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 192.2,
        "lat": 44.23525302530756,
        "lng": -121.25849216404231,
        "evapotranspiration": 420,
        "precipitation": 682.7
      },
      {
        "apn": "1340970000851",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 157.9,
        "lat": 44.342063082253624,
        "lng": -121.23817118380049,
        "evapotranspiration": 312.9,
        "precipitation": 489.5
      },
      {
        "apn": "1345470000147",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 221.1,
        "lat": 44.181810366699295,
        "lng": -121.27164671054264,
        "evapotranspiration": 377.8,
        "precipitation": 681.3
      },
      {
        "apn": "1351480000351",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 232.8,
        "lat": 44.262302786914915,
        "lng": -121.10529501343639,
        "evapotranspiration": 507.3,
        "precipitation": 811.8
      },
      {
        "apn": "1353270000600",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 224.3,
        "lat": 44.25853295211544,
        "lng": -121.10482255771274,
        "evapotranspiration": 501.5,
        "precipitation": 871.8
      },
      {
        "apn": "1353640000155",
        "irrigationDistrict": "Central Oregon",
        "county": "Deschutes",
        "acres": 201.7,
        "lat": 44.21207706393868,
        "lng": -121.2565152750877,
        "evapotranspiration": 327.9,
        "precipitation": 536.6
      },
      {
        "apn": "1318600000295",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 36.9,
        "lat": 44.20932317783062,
        "lng": -120.51653769302791,
        "evapotranspiration": 76.6,
        "precipitation": 152.6
      },
      {
        "apn": "1321380000729",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 67.5,
        "lat": 44.32079869998694,
        "lng": -120.57874879346113,
        "evapotranspiration": 145,
        "precipitation": 254.8
      },
      {
        "apn": "1325830000653",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 226.8,
        "lat": 44.186993655745866,
        "lng": -120.72709908649055,
        "evapotranspiration": 383.8,
        "precipitation": 604.8
      },
      {
        "apn": "1327620000445",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 60.4,
        "lat": 44.20641362854877,
        "lng": -120.66417572973685,
        "evapotranspiration": 138.7,
        "precipitation": 275.2
      },
      {
        "apn": "1330180000678",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 71.1,
        "lat": 44.19091807329182,
        "lng": -120.63214994150414,
        "evapotranspiration": 124.2,
        "precipitation": 193.8
      },
      {
        "apn": "1333590000656",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 194.8,
        "lat": 44.299117924551595,
        "lng": -120.66282860390174,
        "evapotranspiration": 313.3,
        "precipitation": 479.3
      },
      {
        "apn": "1338390000238",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 247,
        "lat": 44.339737544674186,
        "lng": -120.71910572530619,
        "evapotranspiration": 565,
        "precipitation": 993.6
      },
      {
        "apn": "1338600000191",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 99.7,
        "lat": 44.26657575333172,
        "lng": -120.56049369431148,
        "evapotranspiration": 164.8,
        "precipitation": 287.8
      },
      {
        "apn": "1339720000358",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 25.1,
        "lat": 44.226822821159686,
        "lng": -120.52080899958574,
        "evapotranspiration": 48.9,
        "precipitation": 89.5
      },
      {
        "apn": "1340900000819",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 188.1,
        "lat": 44.35874524569022,
        "lng": -120.54502360236368,
        "evapotranspiration": 315,
        "precipitation": 544.2
      },
      {
        "apn": "1341230000653",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 222.8,
        "lat": 44.31225160869048,
        "lng": -120.59214844661966,
        "evapotranspiration": 379.1,
        "precipitation": 629.2
      },
      {
        "apn": "1346370000782",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 217.3,
        "lat": 44.2845854902869,
        "lng": -120.64647841530524,
        "evapotranspiration": 459.1,
        "precipitation": 826.4
      },
      {
        "apn": "1348150000465",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 41.4,
        "lat": 44.243792397457916,
        "lng": -120.633658352181,
        "evapotranspiration": 69.2,
        "precipitation": 118.2
      },
      {
        "apn": "1348660000375",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 99.5,
        "lat": 44.31107339255612,
        "lng": -120.59493335455184,
        "evapotranspiration": 215.4,
        "precipitation": 334.1
      },
      {
        "apn": "1349140000679",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 205.1,
        "lat": 44.308578672379795,
        "lng": -120.58119800157957,
        "evapotranspiration": 483.6,
        "precipitation": 762.9
      },
      {
        "apn": "1353460000370",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 234.5,
        "lat": 44.28866513690787,
        "lng": -120.66283086036596,
        "evapotranspiration": 438,
        "precipitation": 721
      },
      {
        "apn": "1354540000686",
        "irrigationDistrict": "Lone Pine",
        "county": "Crook",
        "acres": 44.7,
        "lat": 44.22848877177433,
        "lng": -120.61903659509406,
        "evapotranspiration": 80.5,
        "precipitation": 121.1
      },
      {
        "apn": "1317870000318",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 224.7,
        "lat": 44.68797632803021,
        "lng": -121.04671111141025,
        "evapotranspiration": 470.1,
        "precipitation": 742.1
      },
      {
        "apn": "1319380000673",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 134.6,
        "lat": 44.57440297459662,
        "lng": -121.1779169962722,
        "evapotranspiration": 224.2,
        "precipitation": 408.6
      },
      {
        "apn": "1319660000697",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 103.3,
        "lat": 44.71024600491882,
        "lng": -121.18548308715735,
        "evapotranspiration": 224.4,
        "precipitation": 443.2
      },
      {
        "apn": "1320070000579",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 155.7,
        "lat": 44.547130467516496,
        "lng": -121.06672689682499,
        "evapotranspiration": 364,
        "precipitation": 698.3
      },
      {
        "apn": "1321120000186",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 190.3,
        "lat": 44.66579309463109,
        "lng": -121.11222658015063,
        "evapotranspiration": 307.8,
        "precipitation": 560.8
      },
      {
        "apn": "1321600000373",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 45.1,
        "lat": 44.65351750313632,
        "lng": -121.15606299374817,
        "evapotranspiration": 83.6,
        "precipitation": 118.7
      },
      {
        "apn": "1328920000804",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 155.8,
        "lat": 44.7030525318096,
        "lng": -121.11300835321006,
        "evapotranspiration": 339.5,
        "precipitation": 488
      },
      {
        "apn": "1329620000303",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 157.7,
        "lat": 44.54840446600542,
        "lng": -121.07639150485991,
        "evapotranspiration": 280.2,
        "precipitation": 397.5
      },
      {
        "apn": "1330170000299",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 247.3,
        "lat": 44.669661986007974,
        "lng": -121.05788983008627,
        "evapotranspiration": 461.3,
        "precipitation": 723.8
      },
      {
        "apn": "1334030000262",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 228,
        "lat": 44.62078387022092,
        "lng": -121.02671295850232,
        "evapotranspiration": 383.6,
        "precipitation": 544.7
      },
      {
        "apn": "1347770000588",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 247,
        "lat": 44.587001671695155,
        "lng": -121.09688117398589,
        "evapotranspiration": 521.1,
        "precipitation": 858.1
      },
      {
        "apn": "1348450000537",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 116.4,
        "lat": 44.558496246839404,
        "lng": -121.2321510187184,
        "evapotranspiration": 245.2,
        "precipitation": 366.2
      },
      {
        "apn": "1349330000703",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 80,
        "lat": 44.71755396141443,
        "lng": -121.10625281938934,
        "evapotranspiration": 150.4,
        "precipitation": 292.6
      },
      {
        "apn": "1354740000382",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 32.1,
        "lat": 44.57158272560834,
        "lng": -121.03115832567322,
        "evapotranspiration": 62.6,
        "precipitation": 94.6
      },
      {
        "apn": "1355220000247",
        "irrigationDistrict": "North Unit",
        "county": "Jefferson",
        "acres": 161.2,
        "lat": 44.61358879105522,
        "lng": -121.2072296581764,
        "evapotranspiration": 379.6,
        "precipitation": 551.7
      },
      {
        "apn": "1316670000452",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 155.1,
        "lat": 44.356462626430634,
        "lng": -120.70044556286227,
        "evapotranspiration": 344,
        "precipitation": 563.3
      },
      {
        "apn": "1319900000510",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 215.2,
        "lat": 44.303276471326384,
        "lng": -120.72453363286753,
        "evapotranspiration": 471.7,
        "precipitation": 892.2
      },
      {
        "apn": "1326250000759",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 51.4,
        "lat": 44.27215238669622,
        "lng": -120.75202157639154,
        "evapotranspiration": 122.3,
        "precipitation": 239.7
      },
      {
        "apn": "1329270000535",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 114.2,
        "lat": 44.33763258069067,
        "lng": -120.7451527457546,
        "evapotranspiration": 202,
        "precipitation": 368
      },
      {
        "apn": "1331860000637",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 64.2,
        "lat": 44.23803650317996,
        "lng": -120.63670978719993,
        "evapotranspiration": 139.1,
        "precipitation": 273.4
      },
      {
        "apn": "1332470000562",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 229.9,
        "lat": 44.30011838109709,
        "lng": -120.69767219387708,
        "evapotranspiration": 383.8,
        "precipitation": 601
      },
      {
        "apn": "1336560000741",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 235.8,
        "lat": 44.295745545896466,
        "lng": -120.76396697278503,
        "evapotranspiration": 384.6,
        "precipitation": 635.8
      },
      {
        "apn": "1342140000464",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 92.1,
        "lat": 44.21767150272864,
        "lng": -120.75228608571206,
        "evapotranspiration": 197.7,
        "precipitation": 370.9
      },
      {
        "apn": "1342370000294",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 10.4,
        "lat": 44.22862688831391,
        "lng": -120.76797276288082,
        "evapotranspiration": 23.2,
        "precipitation": 39.4
      },
      {
        "apn": "1345660000106",
        "irrigationDistrict": "Ochoco",
        "county": "Crook",
        "acres": 87,
        "lat": 44.22207853156801,
        "lng": -120.64358937932512,
        "evapotranspiration": 150.4,
        "precipitation": 258.4
      },
      {
        "apn": "1321560000757",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 211.7,
        "lat": 44.04775668754965,
        "lng": -121.28631818206638,
        "evapotranspiration": 403.2,
        "precipitation": 716.4
      },
      {
        "apn": "1322800000864",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 77.5,
        "lat": 44.090338310543764,
        "lng": -121.29935033571846,
        "evapotranspiration": 143.8,
        "precipitation": 266.8
      },
      {
        "apn": "1324030000697",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 206.1,
        "lat": 44.18118936515524,
        "lng": -121.30708193742397,
        "evapotranspiration": 467.5,
        "precipitation": 809.4
      },
      {
        "apn": "1327830000107",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 204.9,
        "lat": 44.040251147803154,
        "lng": -121.24428163388211,
        "evapotranspiration": 334.9,
        "precipitation": 495.9
      },
      {
        "apn": "1332250000868",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 105.3,
        "lat": 44.088405791771045,
        "lng": -121.17693622204189,
        "evapotranspiration": 225.8,
        "precipitation": 353.4
      },
      {
        "apn": "1332930000523",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 208.5,
        "lat": 44.028766950544686,
        "lng": -121.3113855856111,
        "evapotranspiration": 491.5,
        "precipitation": 962.6
      },
      {
        "apn": "1339750000409",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 61.5,
        "lat": 44.11161122583935,
        "lng": -121.23348819463838,
        "evapotranspiration": 117.1,
        "precipitation": 190.2
      },
      {
        "apn": "1349690000772",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 65.1,
        "lat": 44.1089101108526,
        "lng": -121.27949210264673,
        "evapotranspiration": 120.1,
        "precipitation": 219.3
      },
      {
        "apn": "1350850000496",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 154.2,
        "lat": 44.123514675333645,
        "lng": -121.35415140211038,
        "evapotranspiration": 307,
        "precipitation": 504.7
      },
      {
        "apn": "1351930000476",
        "irrigationDistrict": "Three Sisters",
        "county": "Deschutes",
        "acres": 179.1,
        "lat": 44.11382189966163,
        "lng": -121.36207218886545,
        "evapotranspiration": 306.8,
        "precipitation": 490.8
      }
    ]
  </script>
</div>
```

## Styles
```css
.leaflet-container {
  overflow: hidden;
}
.leaflet-container {
  -webkit-tap-highlight-color: transparent;
}
.leaflet-container {
  background: #ddd;
  outline-offset: 1px;
}
.leaflet-container {
  font-family:
    Helvetica Neue,
    Arial,
    Helvetica,
    sans-serif;
  font-size: 12px;
  font-size: 0.75rem;
  line-height: 1.5;
}
.leaflet-grab {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}
.leaflet-container.leaflet-touch-zoom {
  -ms-touch-action: pan-x pan-y;
  touch-action: pan-x pan-y;
}
.leaflet-container.leaflet-touch-drag {
  -ms-touch-action: pinch-zoom;
  touch-action: none;
  touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  -ms-touch-action: none;
  touch-action: none;
}
.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
  position: absolute;
  left: 0;
  top: 0;
}
.leaflet-pane {
  z-index: 400;
}
.leaflet-tile-pane {
  z-index: 200;
}
.leaflet-overlay-pane {
  z-index: 400;
}
.leaflet-shadow-pane {
  z-index: 500;
}
.leaflet-marker-pane {
  z-index: 600;
}
.leaflet-tooltip-pane {
  z-index: 650;
}
.leaflet-popup-pane {
  z-index: 700;
}
.leaflet-popup-pane,
.leaflet-control {
  cursor: auto;
}
.leaflet-zoom-animated {
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
}
.leaflet-top,
.leaflet-bottom {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}
.leaflet-top {
  top: 0;
}
.leaflet-left {
  left: 0;
}
.leaflet-control {
  position: relative;
  z-index: 800;
  pointer-events: visiblePainted;
  pointer-events: auto;
}
.leaflet-control {
  float: left;
  clear: both;
}
.leaflet-bar {
  box-shadow: 0 1px 5px #000000a6;
  border-radius: 4px;
}
.leaflet-top .leaflet-control {
  margin-top: 10px;
}
.leaflet-left .leaflet-control {
  margin-left: 10px;
}
.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  box-shadow: none;
}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
}
.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  font:
    700 18px Lucida Console,
    Monaco,
    monospace;
  text-indent: 1px;
}
.leaflet-container a {
  -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-container a {
  color: #0078a8;
}
.leaflet-bar a {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #000;
}
.leaflet-bar a,
.leaflet-control-layers-toggle {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: block;
}
.leaflet-touch .leaflet-control-zoom-in,
.leaflet-touch .leaflet-control-zoom-out {
  font-size: 22px;
}
.leaflet-bar a:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.leaflet-touch .leaflet-bar a {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.leaflet-bar a:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: none;
}
.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.leaflet-right {
  right: 0;
}
.leaflet-bottom {
  bottom: 0;
}
.leaflet-control-attribution,
.leaflet-control-scale-line {
  padding: 0 5px;
  color: #333;
  line-height: 1.4;
}
.leaflet-right .leaflet-control {
  float: right;
}
.leaflet-bottom .leaflet-control {
  margin-bottom: 10px;
}
.leaflet-right .leaflet-control {
  margin-right: 10px;
}
.leaflet-container .leaflet-control-attribution {
  background: #fff;
  background: #fffc;
  margin: 0;
}
.leaflet-control-attribution a {
  text-decoration: none;
}
.leaflet-attribution-flag {
  display: inline !important;
  vertical-align: baseline !important;
  width: 1em;
  height: 0.6669em;
}
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-image-layer,
.leaflet-pane > svg path,
.leaflet-tile-container {
  pointer-events: none;
}
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}
.leaflet-tile {
  filter: inherit;
  visibility: hidden;
}
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer,
.leaflet-container .leaflet-tile {
  max-width: none !important;
  max-height: none !important;
  width: auto;
  padding: 0;
}
.leaflet-container img.leaflet-tile {
  mix-blend-mode: plus-lighter;
}
.leaflet-tile::selection {
  background: transparent;
}
.leaflet-overlay-pane svg {
  -moz-user-select: none;
}
.leaflet-map-pane svg {
  z-index: 200;
}
svg.leaflet-zoom-animated {
  will-change: transform;
}
.leaflet-container .leaflet-overlay-pane svg {
  max-width: none !important;
  max-height: none !important;
}
.leaflet-interactive {
  cursor: pointer;
}
.leaflet-marker-icon.leaflet-interactive,
.leaflet-image-layer.leaflet-interactive,
.leaflet-pane > svg path.leaflet-interactive,
svg.leaflet-image-layer.leaflet-interactive path {
  pointer-events: visiblePainted;
  pointer-events: auto;
}
.leaflet-zoom-anim .leaflet-zoom-animated {
  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
  -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
  transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
}
.leaflet-zoom-anim .leaflet-tile,
.leaflet-pan-anim .leaflet-tile {
  -webkit-transition: none;
  -moz-transition: none;
  transition: none;
}
.leaflet-tile-loaded {
  visibility: inherit;
}
.noria-parcel-map {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 480px;
}
.leaflet-container .leaflet-bar {
  border: 1px solid var(--color-border, #ddd9d0);
  border-radius: var(--radius-100, 4px);
  box-shadow: 0 6px 24px -6px #162c3b2e;
  overflow: hidden;
}
.leaflet-container .leaflet-bar a {
  background: var(--color-surface, #ffffff);
  color: var(--color-text-primary, #33312a);
  border-bottom-color: var(--color-border, #ddd9d0);
}
.leaflet-container .leaflet-control-attribution {
  padding: 2px 8px;
  font-family: var(--font-sans, inherit);
  color: var(--color-text-muted, #807c73);
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, #ddd9d0);
  border-radius: var(--radius-100, 4px);
}
.leaflet-container .leaflet-control-attribution a {
  color: var(--color-secondary, #2d759c);
}
```

## Tokens
- `--color-border`: #e5e5e5 _(semantic)_
- `--color-secondary`: #2d759c _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-primary`: #171717 _(semantic)_
- `--font-sans`: "DM Sans", system-ui, sans-serif _(primitive)_
- `--radius-100`: .25rem _(primitive)_
