# Parcel grid

The tabular half of the workspace — every candidate parcel as a row (APN, Irrigation District, County), each value a link. Lives in a 50/50 split beside the map in the Hybrid view.

## Key decisions
- AG Grid Community v36 via the Theming API (themeQuartz.withParams, ModuleRegistry.registerModules([AllCommunityModule])) — no legacy CSS import.
- Search drives AG Grid's built-in quickFilterText, NOT DOM row hiding.
- The grid announces its api to the page via a bubbling `noria-grid-ready` event (with a `#…__agApi` fallback handle), so the toolbar search/clear can reach it without the page owning grid internals.
- Cells render as links via a cellRenderer; odd rows get a faint tint.

## Gotchas
- Capture the grid api from the `noria-grid-ready` event OR the mount's `__agApi` property — do not assume the grid initialized after your listener attached.
- The pane uses overflow:hidden + a 4px radius to keep the AG Grid frame inside the rounded card.

## Done when
- Rows render; typing in the toolbar search filters them; columns sort.

## Markup
```html
<div class="noria-parcel-grid">
  <div id="noria-parcel-grid-mount">
    <div class="ag-styled-root ag-theme-inherit-1">
      <div
        class="ag-styled-root ag-theme-buttonStyle-1 ag-theme-checkboxStyle-2 ag-theme-iconSet-3 ag-theme-tabStyle-4 ag-theme-inputStyle-5 ag-theme-columnDropStyle-6 ag-theme-styleQuartz-7 ag-theme-params-1"
      >
        <div class="ag-styled-root ag-ltr" style="--ag-internal-row-border-width: 1px">
          <div class="ag-measurement-container">
            <div style="width: var(--ag-list-item-height, 15538px)"></div>
            <div style="width: var(--ag-row-height, 15538px)"></div>
            <div style="width: var(--ag-header-height, 15538px)"></div>
            <div
              class="ag-measurement-element-border"
              style="
                --ag-internal-measurement-border: var(--ag-row-border, solid 15538px);
              "
            ></div>
            <div
              class="ag-measurement-element-border"
              style="
                --ag-internal-measurement-border: var(
                  --ag-pinned-row-border,
                  solid 15538px
                );
              "
            ></div>
            <div
              class="ag-measurement-element-border"
              style="
                --ag-internal-measurement-border: var(
                  --ag-header-row-border,
                  solid 15538px
                );
              "
            ></div>
          </div>
          <div
            class="ag-aria-description-container"
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="true"
          ></div>
          <div
            class="ag-root-wrapper ag-layout-normal"
            role="presentation"
            grid-id="1"
            style="content-visibility: visible"
          >
            <div
              class="ag-root-wrapper-body ag-layout-normal ag-focus-managed"
              data-ref="rootWrapperBody"
              role="presentation"
            >
              <div
                class="ag-tab-guard ag-tab-guard-top"
                role="presentation"
                tabindex="0"
              ></div>
              <!--AG-GRID-BODY-->
              <div
                class="ag-root ag-unselectable ag-layout-normal ag-body-horizontal-content-no-gap ag-body-vertical-content-no-gap"
                role="presentation"
                style="
                  --ag-internal-pinned-left-sticky-offset: 0px;
                  --ag-internal-pinned-right-sticky-offset: 0px;
                "
              >
                <div
                  class="ag-grid-viewport ag-layout-normal"
                  data-ref="eGridViewport"
                  role="grid"
                  aria-colcount="3"
                  aria-rowcount="65"
                  style="--ag-internal-fw-anchor-width: 456px"
                >
                  <div
                    class="ag-grid-scrollable-area"
                    data-ref="eGridScrollableArea"
                    role="rowgroup"
                    style="width: 456px"
                  >
                    <div
                      class="ag-grid-pinned-top-rows"
                      data-ref="eTop"
                      role="presentation"
                      style="
                        --ag-top-rows-height: 0px;
                        min-height: calc(var(--ag-header-rows-height, 0px) + 0px);
                        height: calc(var(--ag-header-rows-height, 0px) + 0px);
                        --ag-header-rows-height: 49px;
                      "
                    >
                      <div
                        class="ag-header ag-pivot-off ag-header-allow-overflow"
                        role="presentation"
                        style="height: 49px"
                      >
                        <div
                          class="ag-header-row ag-header-row-column ag-focus-managed"
                          role="row"
                          tabindex="0"
                          aria-rowindex="1"
                          style="top: 0px; height: 48px; width: 456px"
                        >
                          <div
                            class="ag-grid-pinned-left-cells"
                            role="presentation"
                            style="width: 0px; display: none"
                          >
                            <div
                              class="ag-grid-container-wrapper"
                              role="presentation"
                            ></div>
                          </div>
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              class="ag-header-cell ag-column-first ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                              role="columnheader"
                              col-id="apn"
                              aria-colindex="1"
                              tabindex="-1"
                              aria-sort="none"
                              style="
                                top: 0px;
                                height: 48px;
                                width: 152px;
                                touch-action: none;
                                left: 0px;
                              "
                            >
                              <div
                                class="ag-header-cell-resize"
                                data-ref="eResize"
                                role="presentation"
                                aria-hidden="false"
                                style="touch-action: none"
                              ></div>
                              <div
                                class="ag-header-cell-comp-wrapper"
                                data-ref="eHeaderCompWrapper"
                                role="presentation"
                              >
                                <div class="ag-cell-label-container" role="presentation">
                                  <span
                                    class="ag-header-icon ag-header-cell-filter-button"
                                    data-ref="eFilterButton"
                                    aria-hidden="true"
                                    ><span
                                      class="ag-icon ag-icon-filter"
                                      role="presentation"
                                      unselectable="on"
                                    ></span
                                  ></span>
                                  <div
                                    class="ag-header-cell-label"
                                    data-ref="eLabel"
                                    role="presentation"
                                  >
                                    <span class="ag-header-cell-text" data-ref="eText"
                                      >APN</span
                                    >
                                    <!--AG-SORT-INDICATOR--><span
                                      class="ag-sort-indicator-container"
                                      data-ref="eSortIndicator"
                                    >
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                        data-ref="eSortOrder"
                                        aria-hidden="true"
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                        data-ref="eSortAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-asc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                        data-ref="eSortDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-desc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                        data-ref="eSortMixed"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                        data-ref="eSortAbsoluteAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-aasc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                        data-ref="eSortAbsoluteDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-adesc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                        data-ref="eSortNone"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="ag-header-cell ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                              role="columnheader"
                              col-id="irrigationDistrict"
                              aria-colindex="2"
                              tabindex="-1"
                              aria-sort="none"
                              style="
                                top: 0px;
                                height: 48px;
                                width: 152px;
                                touch-action: none;
                                left: 152px;
                              "
                            >
                              <div
                                class="ag-header-cell-resize"
                                data-ref="eResize"
                                role="presentation"
                                aria-hidden="false"
                                style="touch-action: none"
                              ></div>
                              <div
                                class="ag-header-cell-comp-wrapper"
                                data-ref="eHeaderCompWrapper"
                                role="presentation"
                              >
                                <div class="ag-cell-label-container" role="presentation">
                                  <span
                                    class="ag-header-icon ag-header-cell-filter-button"
                                    data-ref="eFilterButton"
                                    aria-hidden="true"
                                    ><span
                                      class="ag-icon ag-icon-filter"
                                      role="presentation"
                                      unselectable="on"
                                    ></span
                                  ></span>
                                  <div
                                    class="ag-header-cell-label"
                                    data-ref="eLabel"
                                    role="presentation"
                                  >
                                    <span class="ag-header-cell-text" data-ref="eText"
                                      >Irrigation District</span
                                    >
                                    <!--AG-SORT-INDICATOR--><span
                                      class="ag-sort-indicator-container"
                                      data-ref="eSortIndicator"
                                    >
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                        data-ref="eSortOrder"
                                        aria-hidden="true"
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                        data-ref="eSortAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-asc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                        data-ref="eSortDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-desc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                        data-ref="eSortMixed"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                        data-ref="eSortAbsoluteAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-aasc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                        data-ref="eSortAbsoluteDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-adesc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                        data-ref="eSortNone"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="ag-header-cell ag-column-last ag-header-parent-hidden ag-header-cell-sortable ag-focus-managed"
                              role="columnheader"
                              col-id="county"
                              aria-colindex="3"
                              tabindex="-1"
                              aria-sort="none"
                              style="
                                top: 0px;
                                height: 48px;
                                width: 152px;
                                touch-action: none;
                                left: 304px;
                              "
                            >
                              <div
                                class="ag-header-cell-resize"
                                data-ref="eResize"
                                role="presentation"
                                aria-hidden="false"
                                style="touch-action: none"
                              ></div>
                              <div
                                class="ag-header-cell-comp-wrapper"
                                data-ref="eHeaderCompWrapper"
                                role="presentation"
                              >
                                <div class="ag-cell-label-container" role="presentation">
                                  <span
                                    class="ag-header-icon ag-header-cell-filter-button"
                                    data-ref="eFilterButton"
                                    aria-hidden="true"
                                    ><span
                                      class="ag-icon ag-icon-filter"
                                      role="presentation"
                                      unselectable="on"
                                    ></span
                                  ></span>
                                  <div
                                    class="ag-header-cell-label"
                                    data-ref="eLabel"
                                    role="presentation"
                                  >
                                    <span class="ag-header-cell-text" data-ref="eText"
                                      >County</span
                                    >
                                    <!--AG-SORT-INDICATOR--><span
                                      class="ag-sort-indicator-container"
                                      data-ref="eSortIndicator"
                                    >
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-order ag-hidden"
                                        data-ref="eSortOrder"
                                        aria-hidden="true"
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-ascending-icon ag-hidden"
                                        data-ref="eSortAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-asc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-descending-icon ag-hidden"
                                        data-ref="eSortDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-desc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-mixed-icon ag-hidden"
                                        data-ref="eSortMixed"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-ascending-icon ag-hidden"
                                        data-ref="eSortAbsoluteAsc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-aasc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-absolute-descending-icon ag-hidden"
                                        data-ref="eSortAbsoluteDesc"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-adesc"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                      <span
                                        class="ag-sort-indicator-icon ag-sort-none-icon ag-hidden"
                                        data-ref="eSortNone"
                                        aria-hidden="true"
                                        ><span
                                          class="ag-icon ag-icon-none"
                                          role="presentation"
                                          unselectable="on"
                                        ></span
                                      ></span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ag-grid-pinned-right-cells"
                            role="presentation"
                            style="width: 0px; display: none"
                          >
                            <div
                              class="ag-grid-container-wrapper"
                              role="presentation"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="ag-extra-rows-container"
                        data-ref="eTopExtraRows"
                        role="presentation"
                        style="top: var(--ag-header-rows-height, 0px)"
                      ></div>
                      <!--AG-ROW-CONTAINER-->
                      <div
                        class="ag-grid-pinned-top-rows-container ag-hidden ag-row-animation"
                        data-ref="eContainer"
                        role="presentation"
                        style="width: 456px; --ag-pinned-row-border-width: 1px; top: 49px"
                      ></div>
                      <!--AG-ROW-CONTAINER-->
                      <div
                        class="ag-grid-sticky-top-rows-container ag-hidden"
                        data-ref="eContainer"
                        role="presentation"
                        style="width: 456px; --ag-pinned-row-border-width: 1px; top: 49px"
                      ></div>
                    </div>
                    <div
                      class="ag-grid-scrolling-rows ag-layout-normal"
                      data-ref="eBody"
                      role="presentation"
                    >
                      <!--AG-ROW-CONTAINER-->
                      <div
                        class="ag-grid-scrolling-container ag-row-animation"
                        data-ref="eContainer"
                        role="presentation"
                        style="
                          width: 456px;
                          --ag-pinned-row-border-width: 1px;
                          height: 2688px;
                        "
                      >
                        <div
                          role="row"
                          comp-id="30"
                          tabindex="0"
                          row-index="0"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"
                          aria-rowindex="2"
                          row-id="0"
                          style="transform: translateY(0px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="31"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1321720000773</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="32"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="33"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="34"
                          tabindex="0"
                          row-index="1"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="3"
                          row-id="1"
                          style="transform: translateY(42px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="35"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1333170000688</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="36"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="37"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="38"
                          tabindex="0"
                          row-index="2"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="4"
                          row-id="2"
                          style="transform: translateY(84px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="39"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1334330000314</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="40"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="41"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="42"
                          tabindex="0"
                          row-index="3"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="5"
                          row-id="3"
                          style="transform: translateY(126px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="43"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1338700000802</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="44"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="45"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="46"
                          tabindex="0"
                          row-index="4"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="6"
                          row-id="4"
                          style="transform: translateY(168px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="47"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1339600000790</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="48"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="49"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="50"
                          tabindex="0"
                          row-index="5"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="7"
                          row-id="5"
                          style="transform: translateY(210px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="51"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1339760000679</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="52"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="53"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="54"
                          tabindex="0"
                          row-index="6"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="8"
                          row-id="6"
                          style="transform: translateY(252px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="55"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1340200000696</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="56"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="57"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="58"
                          tabindex="0"
                          row-index="7"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="9"
                          row-id="7"
                          style="transform: translateY(294px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="59"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1340970000851</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="60"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="61"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="62"
                          tabindex="0"
                          row-index="8"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="10"
                          row-id="8"
                          style="transform: translateY(336px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="63"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1345470000147</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="64"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="65"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="66"
                          tabindex="0"
                          row-index="9"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="11"
                          row-id="9"
                          style="transform: translateY(378px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="67"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1351480000351</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="68"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="69"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="70"
                          tabindex="0"
                          row-index="10"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="12"
                          row-id="10"
                          style="transform: translateY(420px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="71"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1353270000600</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="72"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="73"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="74"
                          tabindex="0"
                          row-index="11"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="13"
                          row-id="11"
                          style="transform: translateY(462px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="75"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1353640000155</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="76"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Central Oregon</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="77"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Deschutes</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="78"
                          tabindex="0"
                          row-index="12"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="14"
                          row-id="12"
                          style="transform: translateY(504px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="79"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1318600000295</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="80"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="81"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="82"
                          tabindex="0"
                          row-index="13"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="15"
                          row-id="13"
                          style="transform: translateY(546px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="83"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1321380000729</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="84"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="85"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="86"
                          tabindex="0"
                          row-index="14"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="16"
                          row-id="14"
                          style="transform: translateY(588px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="87"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1325830000653</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="88"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="89"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="90"
                          tabindex="0"
                          row-index="15"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="17"
                          row-id="15"
                          style="transform: translateY(630px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="91"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1327620000445</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="92"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="93"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="94"
                          tabindex="0"
                          row-index="16"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="18"
                          row-id="16"
                          style="transform: translateY(672px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="95"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1330180000678</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="96"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="97"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="98"
                          tabindex="0"
                          row-index="17"
                          class="ag-row-odd ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="19"
                          row-id="17"
                          style="transform: translateY(714px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="99"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1333590000656</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="100"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="101"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                        <div
                          role="row"
                          comp-id="102"
                          tabindex="0"
                          row-index="18"
                          class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute"
                          aria-rowindex="20"
                          row-id="18"
                          style="transform: translateY(756px); height: 42px"
                        >
                          <div
                            class="ag-grid-scrolling-cells"
                            role="presentation"
                            style="width: 456px"
                          >
                            <div
                              role="gridcell"
                              comp-id="103"
                              col-id="apn"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-first"
                              tabindex="-1"
                              aria-colindex="1"
                              style="left: 0px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">1338390000238</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="104"
                              col-id="irrigationDistrict"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height"
                              tabindex="-1"
                              aria-colindex="2"
                              style="left: 152px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Lone Pine</a>
                            </div>
                            <div
                              role="gridcell"
                              comp-id="105"
                              col-id="county"
                              class="ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-column-last"
                              tabindex="-1"
                              aria-colindex="3"
                              style="left: 304px; width: 152px"
                            >
                              <a href="#" class="noria-grid-link">Crook</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="ag-grid-pinned-bottom-rows ag-hidden"
                      data-ref="eBottom"
                      role="presentation"
                      style="
                        --ag-bottom-rows-height: 0px;
                        min-height: 0px;
                        height: 0px;
                        width: calc(100% + 0px);
                      "
                    >
                      <!--AG-ROW-CONTAINER-->
                      <div
                        class="ag-grid-sticky-bottom-rows-container ag-hidden"
                        data-ref="eContainer"
                        role="presentation"
                        style="width: 456px; --ag-pinned-row-border-width: 1px; top: 0px"
                      ></div>
                      <!--AG-ROW-CONTAINER-->
                      <div
                        class="ag-grid-pinned-bottom-rows-container ag-hidden ag-row-animation"
                        data-ref="eContainer"
                        role="presentation"
                        style="width: 456px; --ag-pinned-row-border-width: 1px; top: 0px"
                      ></div>
                    </div>
                  </div>
                </div>
                <!--AG-FAKE-HORIZONTAL-SCROLL-->
                <div
                  class="ag-body-horizontal-scroll ag-apple-scrollbar ag-scrollbar-invisible ag-invisible"
                  aria-hidden="true"
                  style="bottom: 0px; height: 16px; max-height: 16px; min-height: 16px"
                >
                  <div
                    class="ag-body-horizontal-scroll-viewport"
                    data-ref="eViewport"
                    style="height: 16px; max-height: 16px; min-height: 16px; width: 100%"
                  >
                    <div
                      class="ag-body-horizontal-scroll-container"
                      data-ref="eContainer"
                      style="
                        width: 456px;
                        height: 16px;
                        max-height: 16px;
                        min-height: 16px;
                      "
                    ></div>
                  </div>
                  <div
                    class="ag-body-horizontal-scroll-end-spacer"
                    data-ref="eEndSpacer"
                    style="
                      height: 16px;
                      max-height: 16px;
                      min-height: 16px;
                      width: 0px;
                      max-width: 0px;
                      min-width: 0px;
                      display: none;
                    "
                  ></div>
                </div>
                <!--AG-FAKE-VERTICAL-SCROLL-->
                <div
                  class="ag-body-vertical-scroll ag-apple-scrollbar ag-scrollbar-invisible"
                  aria-hidden="true"
                  style="bottom: 0px; width: 16px; max-width: 16px; min-width: 16px"
                >
                  <div
                    class="ag-body-vertical-scroll-start-spacer"
                    data-ref="eSpacer"
                    style="height: 49px"
                  ></div>
                  <div
                    class="ag-body-vertical-scroll-viewport"
                    data-ref="eViewport"
                    style="width: 16px; max-width: 16px; min-width: 16px"
                  >
                    <div
                      class="ag-body-vertical-scroll-container"
                      data-ref="eContainer"
                      style="
                        height: 2688px;
                        width: 16px;
                        max-width: 16px;
                        min-width: 16px;
                      "
                    ></div>
                  </div>
                </div>
                <!--AG-OVERLAY-WRAPPER-->
                <div class="ag-overlay ag-hidden" role="presentation">
                  <div class="ag-overlay-panel" role="presentation">
                    <div
                      class="ag-overlay-wrapper ag-layout-normal"
                      data-ref="eOverlayWrapper"
                      role="presentation"
                      style="padding-top: 0px"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                class="ag-tab-guard ag-tab-guard-bottom"
                role="presentation"
                tabindex="0"
              ></div>
            </div>
            <!--AG-PAGINATION-->
            <div
              class="ag-paging-panel ag-unselectable ag-focus-managed ag-hidden"
              id="ag-10"
              aria-hidden="true"
            >
              <div
                class="ag-tab-guard ag-tab-guard-top"
                role="presentation"
                tabindex="0"
              ></div>
              <div class="ag-paging-panel-content" data-ref="eContent">
                <span class="ag-paging-page-size"
                  ><div
                    class="ag-picker-field ag-labeled ag-label-align-left ag-select"
                    role="presentation"
                  >
                    <div
                      data-ref="eLabel"
                      class="ag-label"
                      aria-hidden="false"
                      id="ag-12-label"
                    >
                      Page Size:
                    </div>
                    <div
                      class="ag-wrapper ag-picker-field-wrapper ag-picker-collapsed"
                      data-ref="eWrapper"
                      tabindex="0"
                      aria-expanded="false"
                      role="combobox"
                      aria-controls="ag-select-list-13"
                      aria-label="Page Size"
                    >
                      <div
                        class="ag-picker-field-display"
                        data-ref="eDisplayField"
                        id="ag-12-display"
                      >
                        100
                      </div>
                      <div
                        class="ag-picker-field-icon"
                        data-ref="eIcon"
                        aria-hidden="true"
                      >
                        <span
                          class="ag-icon ag-icon-small-down"
                          role="presentation"
                          unselectable="on"
                        ></span>
                      </div>
                    </div></div></span
                ><span
                  class="ag-paging-row-summary-panel"
                  style="--ag-internal-pagination-width-string: &quot;0 to 0 of 0&quot;"
                >
                  <span class="ag-paging-row-summary-content">
                    <span
                      class="ag-paging-row-summary-panel-number"
                      data-ref="lbFirstRowOnPage"
                      id="ag-10-first-row"
                      >1</span
                    >
                    <span id="ag-10-to">to</span>
                    <span
                      class="ag-paging-row-summary-panel-number"
                      data-ref="lbLastRowOnPage"
                      id="ag-10-last-row"
                      >0</span
                    >
                    <span id="ag-10-of">of</span>
                    <span
                      class="ag-paging-row-summary-panel-number"
                      data-ref="lbRecordCount"
                      id="ag-10-row-count"
                      >0</span
                    >
                  </span> </span
                ><span class="ag-paging-page-summary-panel" role="presentation">
                  <div
                    class="ag-button ag-paging-button ag-disabled"
                    data-ref="btFirst"
                    role="button"
                    aria-label="First Page"
                    tabindex="0"
                    aria-disabled="true"
                  >
                    <span
                      class="ag-icon ag-icon-first"
                      role="presentation"
                      unselectable="on"
                    ></span>
                  </div>
                  <div
                    class="ag-button ag-paging-button ag-disabled"
                    data-ref="btPrevious"
                    role="button"
                    aria-label="Previous Page"
                    tabindex="0"
                    aria-disabled="true"
                  >
                    <span
                      class="ag-icon ag-icon-previous"
                      role="presentation"
                      unselectable="on"
                    ></span>
                  </div>
                  <span class="ag-paging-description">
                    <span id="ag-10-start-page">Page</span>
                    <!--AG-INPUT-NUMBER-FIELD-->
                    <div
                      role="presentation"
                      class="ag-paging-number ag-labeled ag-label-align-left ag-number-field ag-input-field"
                      data-ref="lbCurrentInput"
                      id="ag-10-start-page-number"
                    >
                      <div
                        class="ag-input-field-label ag-label ag-hidden ag-number-field-label"
                        data-ref="eLabel"
                        aria-hidden="true"
                        role="presentation"
                        id="ag-19-label"
                      ></div>
                      <div
                        class="ag-wrapper ag-input-wrapper ag-number-field-input-wrapper"
                        data-ref="eWrapper"
                        role="presentation"
                      >
                        <input
                          class="ag-input-field-input ag-number-field-input"
                          data-ref="eInput"
                          type="number"
                          id="ag-19-input"
                          tabindex="0"
                          step="any"
                          role="spinbutton"
                          min="1"
                          max="1"
                          aria-label="Page number, 1 of 1"
                          aria-valuenow="1"
                          aria-valuemin="1"
                          aria-valuemax="1"
                          style="width: 3.5ch"
                        />
                      </div>
                    </div>
                    <span id="ag-10-of-page">of</span>
                    <span
                      class="ag-paging-number"
                      data-ref="lbTotal"
                      id="ag-10-of-page-number"
                      >1</span
                    >
                  </span>
                  <div
                    class="ag-button ag-paging-button ag-disabled"
                    data-ref="btNext"
                    role="button"
                    aria-label="Next Page"
                    tabindex="0"
                    aria-disabled="true"
                  >
                    <span
                      class="ag-icon ag-icon-next"
                      role="presentation"
                      unselectable="on"
                    ></span>
                  </div>
                  <div
                    class="ag-button ag-paging-button ag-disabled"
                    data-ref="btLast"
                    role="button"
                    aria-label="Last Page"
                    tabindex="0"
                    aria-disabled="true"
                  >
                    <span
                      class="ag-icon ag-icon-last"
                      role="presentation"
                      unselectable="on"
                    ></span>
                  </div>
                </span>
              </div>
              <div
                class="ag-tab-guard ag-tab-guard-bottom"
                role="presentation"
                tabindex="0"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Server → client bridge: the parcels prop, serialized for the AG Grid
       script below (is:inline keeps Astro from bundling the JSON as JS). -->
  <script id="noria-parcel-grid-data" type="application/json">
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
:where(.ag-theme-tabStyle-4) {
.ag-tabs-header{background-color:var(--ag-tab-bar-background-color);border-bottom:var(--ag-tab-bar-border);display:flex;flex:1;gap:var(--ag-tab-spacing);padding:var(--ag-tab-bar-top-padding) var(--ag-tab-bar-horizontal-padding) 0}
:where(.ag-ltr) .ag-tabs-close-button-wrapper{border-right:solid var(--ag-border-width) var(--ag-border-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:first-of-type)){border-left-color:var(--ag-tab-selected-border-color)}
:where(.ag-ltr) .ag-tab.ag-tab-selected:where(:not(:last-of-type)){border-right-color:var(--ag-tab-selected-border-color)}
.ag-styled-root{cursor:default;display:contents;line-height:normal;white-space:normal;-webkit-font-smoothing:antialiased;color:var(--ag-text-color);color-scheme:var(--ag-browser-color-scheme);font-family:var(--ag-font-family);font-size:var(--ag-font-size);font-weight:var(--ag-font-weight);--ag-indentation-level:0}
.ag-measurement-container{height:0;overflow:hidden;visibility:hidden;width:0}
.ag-measurement-element-border{display:inline-block}
.ag-measurement-element-border:before{border-left:var(--ag-internal-measurement-border);content:"";display:block}
.ag-tab-guard{display:block;height:0;position:absolute;width:0}
.ag-tab-guard-top{top:1px}
.ag-hidden{display:none!important}
.ag-tab-guard-bottom{bottom:1px}
.ag-icon{background-position:50%;background-repeat:no-repeat;background-size:contain;color:var(--ag-icon-color);display:block;height:var(--ag-icon-size);position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:var(--ag-icon-size)}
:where(.ag-icon):before{align-items:center;background-color:currentcolor;color:inherit;content:"";display:flex;font-family:inherit;font-size:var(--ag-icon-size);font-style:normal;font-variant:normal;height:var(--ag-icon-size);justify-content:center;line-height:var(--ag-icon-size);-webkit-mask-size:contain;mask-size:contain;text-transform:none;width:var(--ag-icon-size)}
.ag-invisible{visibility:hidden!important}
:where(.ag-theme-buttonStyle-1) {
:where(.ag-button){background:none;border:none;color:inherit;font-family:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0;text-indent:inherit;text-shadow:inherit;text-transform:inherit;word-spacing:inherit;&:focus-visible{box-shadow:var(--ag-focus-shadow);outline:none}
:where(.ag-button:not(:disabled)){cursor:pointer}
:where(.ag-ltr){direction:ltr;.ag-grid-pinned-bottom-rows,.ag-grid-pinned-bottom-rows-container,.ag-grid-pinned-top-rows,.ag-grid-pinned-top-rows-container,.ag-grid-scrolling-rows,.ag-grid-sticky-bottom-rows-container,.ag-grid-sticky-top-rows-container{flex-direction:row}
.ag-header-row,.ag-row:where(.ag-embedded-full-width-row),.ag-row:where(:not(.ag-full-width-row)){flex-direction:row}
.ag-aria-description-container{border:0;clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;z-index:9999}
.ag-root-wrapper{background-color:var(--ag-wrapper-background-color);border:var(--ag-wrapper-border);border-radius:var(--ag-wrapper-border-radius);container-type:inline-size;display:flex;flex-direction:column;overflow:hidden;position:relative;&.ag-layout-normal{content-visibility:auto;height:100%}
&.ag-layout-normal{content-visibility:auto;height:100%}
.ag-root-wrapper-body{display:flex;flex-direction:row;&.ag-layout-normal{flex:1 1 auto;height:0;min-height:0}
&.ag-layout-normal{flex:1 1 auto;height:0;min-height:0}
:where(.ag-ltr) :where(.ag-body-horizontal-content-no-gap){.ag-header-cell:where(.ag-column-last):after,.ag-header-group-cell:where(.ag-column-last):after{border-right-color:transparent}
.ag-unselectable{-webkit-user-select:none;-moz-user-select:none;user-select:none}
.ag-root{display:flex;flex-direction:column;position:relative;&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
&.ag-layout-normal{height:100%}
&.ag-layout-auto-height,&.ag-layout-normal{flex:1 1 auto;overflow:hidden;width:0}
&.ag-layout-normal{height:100%}
.ag-grid-viewport{flex:1 1 auto;min-height:0;min-width:0;overflow:auto;position:relative;-webkit-overflow-scrolling:touch;-ms-overflow-style:none!important;scrollbar-width:none!important}
.ag-grid-scrollable-area{display:flex;flex-direction:column;min-height:100%;min-width:100%;position:relative}
.ag-grid-pinned-bottom-rows,.ag-grid-pinned-top-rows{background-color:var(--ag-data-background-color);position:sticky;width:100%;z-index:2}
.ag-grid-pinned-top-rows{top:0;white-space:nowrap}
.ag-grid-pinned-bottom-rows,.ag-grid-pinned-bottom-rows-container,.ag-grid-pinned-top-rows,.ag-grid-pinned-top-rows-container,.ag-grid-scrolling-rows,.ag-grid-sticky-bottom-rows-container,.ag-grid-sticky-top-rows-container{flex-direction:row}
.ag-header{border-bottom:var(--ag-header-row-border);left:0;position:absolute;right:0;top:0;z-index:1}
.ag-header{color:var(--ag-header-text-color);font-family:var(--ag-header-font-family);font-size:var(--ag-header-font-size);font-weight:var(--ag-header-font-weight)}
.ag-extra-rows-container{position:absolute;width:100%}
.ag-grid-pinned-bottom-rows-container,.ag-grid-pinned-top-rows-container,.ag-grid-sticky-bottom-rows-container,.ag-grid-sticky-top-rows-container{background-color:var(--ag-data-background-color);overflow:visible;position:absolute;white-space:nowrap;width:100%}
.ag-grid-pinned-top-rows-container{border-bottom:var(--ag-pinned-row-border);display:flex;z-index:1}
.ag-grid-scrolling-rows{display:flex;flex:1 1 auto;flex-direction:row!important;min-height:0;position:relative}
.ag-grid-pinned-bottom-rows-container,.ag-grid-scrolling-rows{background-color:var(--ag-data-background-color)}
.ag-grid-scrolling-container{display:block;min-height:100%;width:100%}
.ag-body-horizontal-scroll-container,.ag-body-vertical-scroll-container,.ag-grid-scrolling-container{position:relative}
.ag-grid-pinned-bottom-rows{border-bottom:none;bottom:0;box-sizing:content-box!important;white-space:nowrap}
.ag-body-horizontal-scroll,.ag-body-vertical-scroll{display:flex;min-height:0;min-width:0;&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;z-index:2;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
.ag-body-horizontal-scroll{flex:none;width:100%;&:where(.ag-scrollbar-invisible){left:0;right:0}
.ag-body-horizontal-scroll-viewport,.ag-body-vertical-scroll-viewport{background-color:var(--ag-data-background-color);flex:1 1 auto;height:100%;min-width:0;overflow:hidden;position:relative}
.ag-body-horizontal-scroll-viewport{overflow-x:scroll}
.ag-body-horizontal-scroll-container{height:100%}
.ag-body-horizontal-scroll-end-spacer{flex:0 0 auto;min-width:0;overflow:scroll}
.ag-body-vertical-scroll{flex-direction:column;pointer-events:none;position:absolute;top:0;z-index:2}
:where(.ag-ltr) .ag-body-vertical-scroll{right:0}
.ag-body-vertical-scroll-start-spacer{border-bottom:var(--ag-header-row-border);flex:none;opacity:0}
.ag-body-vertical-scroll-viewport{overflow-y:scroll;pointer-events:all}
.ag-body-vertical-scroll-container{width:100%}
:where(.ag-header-row),:where(.ag-row.ag-embedded-full-width-row),:where(.ag-row:not(.ag-full-width-row)){>.ag-grid-pinned-right-cells{order:1}
.ag-header-row,.ag-row:where(:not(.ag-full-width-row)),:where(.ag-row.ag-embedded-full-width-row){display:flex;width:100%}
.ag-header-row,.ag-row:where(.ag-embedded-full-width-row),.ag-row:where(:not(.ag-full-width-row)){flex-direction:row}
.ag-header-row{border-bottom:none;height:var(--ag-header-height);position:absolute;.ag-grid-scrolling-cells{background-color:var(--ag-header-background-color)}
>.ag-grid-pinned-left-cells,>.ag-grid-pinned-right-cells{background-image:linear-gradient(var(--ag-background-color),var(--ag-background-color))}
.ag-grid-container-wrapper{background-color:var(--ag-header-background-color);height:100%;width:100%}
.ag-grid-pinned-left-cells,.ag-grid-pinned-right-cells{overflow:visible}
.ag-header-row:where(:not(.ag-header-row-column-group)){overflow:visible}
.ag-grid-pinned-left-cells,.ag-grid-pinned-right-cells,.ag-grid-scrolling-cells{height:100%;position:relative;white-space:nowrap}
.ag-grid-pinned-left-cells,.ag-grid-pinned-right-cells{flex:0 0 auto;overflow:hidden;position:sticky;z-index:2}
.ag-grid-pinned-left-cells{left:var(--ag-internal-pinned-left-sticky-offset,0)}
>.ag-grid-pinned-left-cells,>.ag-grid-pinned-right-cells{background-image:linear-gradient(var(--ag-background-color),var(--ag-background-color))}
.ag-grid-pinned-left-cells,.ag-grid-pinned-right-cells{overflow:visible}
.ag-grid-scrolling-cells{flex:0 0 auto;z-index:0}
.ag-grid-scrolling-cells{background-color:var(--ag-header-background-color)}
:where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-header-col-ref{color:var(--ag-subtle-text-color)}
:where(.ag-ltr) :where(.ag-header-cell:not(.ag-right-aligned-header)){.ag-calculated-column-icon,.ag-header-col-ref{margin-right:var(--ag-spacing)}
.ag-header-label-icon,.ag-header-menu-icon{margin-left:var(--ag-spacing)}
.ag-header-cell{display:inline-flex;overflow:hidden}
.ag-header-cell,.ag-header-group-cell{align-items:center;gap:var(--ag-cell-widget-spacing);height:100%;padding:0 var(--ag-cell-horizontal-padding);position:absolute}
.ag-header-cell:where(:not(.ag-floating-filter)):before,.ag-header-group-cell:before{background-image:linear-gradient(var(--ag-internal-hover-color),var(--ag-internal-hover-color)),linear-gradient(var(--ag-internal-moving-color),var(--ag-internal-moving-color));content:"";inset:0;position:absolute;--ag-internal-moving-color:transparent;--ag-internal-hover-color:transparent;transition:--ag-internal-moving-color var(--ag-header-cell-background-transition-duration),--ag-internal-hover-color var(--ag-header-cell-background-transition-duration)}
:where(.ag-header-cell:not(.ag-floating-filter)>*,.ag-header-group-cell>*){position:relative;z-index:1}
.ag-header-cell-resize{align-items:center;cursor:col-resize;display:flex;height:100%;position:absolute;top:0;width:8px;z-index:2}
:where(.ag-ltr) .ag-header-cell-resize{right:-3px}
.ag-header-cell-resize:after{background-color:var(--ag-header-column-resize-handle-color);content:"";height:var(--ag-header-column-resize-handle-height);position:absolute;top:calc(50% - var(--ag-header-column-resize-handle-height)*.5);width:var(--ag-header-column-resize-handle-width);z-index:1}
:where(.ag-ltr) .ag-header-cell-resize:after{left:calc(50% - var(--ag-header-column-resize-handle-width))}
.ag-header-cell-comp-wrapper{width:100%}
:where(.ag-header-cell:not(.ag-header-cell-auto-height)) .ag-header-cell-comp-wrapper{align-items:center;display:flex;height:100%}
.ag-cell-label-container{align-items:center;display:flex;flex-direction:row-reverse;height:100%;justify-content:space-between;width:100%}
.ag-floating-filter-button-button,.ag-header-cell-filter-button,.ag-header-cell-menu-button,.ag-header-expand-icon,.ag-panel-title-bar-button,:where(.ag-header-cell-sortable) .ag-header-cell-label,:where(.ag-header-group-cell-selectable) .ag-header-cell-comp-wrapper{cursor:pointer}
.ag-header-cell-filter-button,:where(.ag-header-cell.ag-header-active) .ag-header-cell-menu-button{opacity:1}
.ag-chart-menu-icon,.ag-chart-settings-next,.ag-chart-settings-prev,.ag-column-group-icons,.ag-column-select-header-icon,.ag-filter-toolpanel-expand,.ag-floating-filter-button-button,.ag-group-title-bar-icon,.ag-header-cell-filter-button,.ag-header-cell-menu-button,.ag-header-expand-icon,.ag-panel-title-bar-button,.ag-panel-title-bar-button-icon,.ag-set-filter-group-icons,:where(.ag-group-contracted) .ag-icon,:where(.ag-group-expanded) .ag-icon{background-color:var(--ag-icon-button-background-color);border-radius:var(--ag-icon-button-border-radius);box-shadow:0 0 0 var(--ag-icon-button-background-spread) var(--ag-icon-button-background-color);color:var(--ag-icon-button-color)}
.ag-header-cell-label,.ag-header-group-cell-label{align-items:center;align-self:stretch;display:flex;flex:1 1 auto;overflow:hidden;padding:5px 0}
.ag-header-cell-label{text-overflow:ellipsis}
.ag-header-cell-text,.ag-header-group-text{overflow:hidden;text-overflow:ellipsis}
.ag-header-cell-text{overflow-wrap:break-word}
.ag-sort-indicator-container{display:flex;gap:var(--ag-spacing)}
:where(.ag-ltr) .ag-sort-indicator-icon{padding-left:var(--ag-spacing)}
.ag-header-cell:after,.ag-header-group-cell:after{content:"";height:var(--ag-header-column-border-height);position:absolute;top:calc(50% - var(--ag-header-column-border-height)*.5);z-index:1}
:where(.ag-ltr) .ag-header-cell:after,:where(.ag-ltr) .ag-header-group-cell:after{border-right:var(--ag-header-column-border);right:0}
:where(.ag-ltr) :where(.ag-body-horizontal-content-no-gap) .ag-column-last{border-right-color:transparent}
.ag-header-cell:where(.ag-column-last):after,.ag-header-group-cell:where(.ag-column-last):after{border-right-color:transparent}
.ag-grid-pinned-right-cells{right:var(--ag-internal-pinned-right-sticky-offset,0)}
>.ag-grid-pinned-right-cells{order:1}
:where(.ag-header-row):after,:where(.ag-row.ag-embedded-full-width-row:after),:where(.ag-row:not(.ag-full-width-row)):after{align-self:stretch;content:"";flex:1 0 0px}
:where(.ag-header-row):after{background-color:var(--ag-header-background-color)}
:where(.ag-row:not(.ag-header-row)){background-color:var(--ag-data-background-color);--ag-internal-row-overlay-color:transparent;--ag-internal-row-overlay-image:none}
:where(.ag-row-animation) .ag-row{transition:transform .4s,top .4s,opacity .2s;&:where(.ag-after-created){transition:transform .4s,top .4s,height .4s,opacity .2s}
.ag-row-position-absolute{position:absolute}
.ag-row,.ag-spanned-row{color:var(--ag-cell-text-color);font-family:var(--ag-cell-font-family);font-size:var(--ag-cell-font-size);font-weight:var(--ag-cell-font-weight);white-space:nowrap;--ag-internal-content-line-height:calc(min(var(--ag-row-height), var(--ag-line-height, 1000px)) - var(--ag-internal-row-border-width, 1px) - 2px)}
.ag-row{height:var(--ag-row-height);width:100%;&.ag-row-editing-invalid{background-color:var(--ag-full-row-edit-invalid-background-color)}
.ag-row:where(.ag-embedded-full-width-row),.ag-row:where(:not(.ag-header-row,.ag-full-width-row)){>.ag-grid-pinned-left-cells,>.ag-grid-pinned-right-cells,>.ag-grid-scrolling-cells{border-bottom:var(--ag-row-border)}
.ag-row:not(.ag-header-row){>.ag-grid-pinned-left-cells,>.ag-grid-pinned-right-cells{background-color:inherit;background-image:linear-gradient(var(--ag-data-background-color),var(--ag-data-background-color))}
.ag-grid-container-wrapper{background-color:inherit}
>.ag-grid-pinned-left-cells,>.ag-grid-pinned-right-cells,>.ag-grid-scrolling-cells{border-bottom:var(--ag-row-border)}
.ag-cell{display:inline-block;height:100%;position:absolute;white-space:nowrap;&:focus-visible{box-shadow:none}
.ag-cell-value{flex:1 1 auto}
.ag-cell,.ag-full-width-row .ag-cell-wrapper.ag-row-group{border:1px solid transparent;line-height:var(--ag-internal-content-line-height);-webkit-font-smoothing:subpixel-antialiased}
:where(.ag-ltr) .ag-cell{border-right:var(--ag-column-border)}
.ag-cell-value:not(.ag-allow-overflow),.ag-group-value{overflow:hidden;text-overflow:ellipsis}
:where(.ag-ltr) .ag-cell:not(.ag-cell-inline-editing),:where(.ag-ltr) .ag-full-width-row .ag-cell-wrapper.ag-row-group{padding-left:calc(var(--ag-cell-horizontal-padding) - 1px + var(--ag-row-group-indent-size)*var(--ag-indentation-level));padding-right:calc(var(--ag-cell-horizontal-padding) - 1px)}
:where(.ag-row.ag-embedded-full-width-row:after),:where(.ag-row:not(.ag-header-row,.ag-full-width-row)):after{background-color:var(--ag-data-background-color)}
.ag-row-odd{background-color:var(--ag-odd-row-background-color)}
&:where(.ag-scrollbar-invisible){bottom:0;position:absolute;z-index:2;&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-apple-scrollbar){opacity:0;transition:opacity .4s;visibility:hidden;&:where(.ag-scrollbar-active),&:where(.ag-scrollbar-scrolling){opacity:1;visibility:visible}
&:where(.ag-scrollbar-invisible){left:0;right:0}
:where(.ag-theme-inherit-1) {
	--ag-inherited-accent-color: var(--ag-accent-color);
	--ag-inherited-advanced-filter-builder-button-bar-border: var(--ag-advanced-filter-builder-button-bar-border);
	--ag-inherited-advanced-filter-builder-column-pill-color: var(--ag-advanced-filter-builder-column-pill-color);
	--ag-inherited-advanced-filter-builder-indent-size: var(--ag-advanced-filter-builder-indent-size);
	--ag-inherited-advanced-filter-builder-join-pill-color: var(--ag-advanced-filter-builder-join-pill-color);
	--ag-inherited-advanced-filter-builder-option-pill-color: var(--ag-advanced-filter-builder-option-pill-color);
	--ag-inherited-advanced-filter-builder-value-pill-color: var(--ag-advanced-filter-builder-value-pill-color);
	--ag-inherited-auto-height-min-body-height: var(--ag-auto-height-min-body-height);
	--ag-inherited-background-color: var(--ag-background-color);
	--ag-inherited-border-color: var(--ag-border-color);
	--ag-inherited-border-radius: var(--ag-border-radius);
	--ag-inherited-border-width: var(--ag-border-width);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-button-active-background-color: var(--ag-button-active-background-color);
	--ag-inherited-button-active-border: var(--ag-button-active-border);
	--ag-inherited-button-active-text-color: var(--ag-button-active-text-color);
	--ag-inherited-button-background-color: var(--ag-button-background-color);
	--ag-inherited-button-border: var(--ag-button-border);
	--ag-inherited-button-border-radius: var(--ag-button-border-radius);
	--ag-inherited-button-disabled-background-color: var(--ag-button-disabled-background-color);
	--ag-inherited-button-disabled-border: var(--ag-button-disabled-border);
	--ag-inherited-button-disabled-text-color: var(--ag-button-disabled-text-color);
	--ag-inherited-button-font-weight: var(--ag-button-font-weight);
	--ag-inherited-button-horizontal-padding: var(--ag-button-horizontal-padding);
	--ag-inherited-button-hover-background-color: var(--ag-button-hover-background-color);
	--ag-inherited-button-hover-border: var(--ag-button-hover-border);
	--ag-inherited-button-hover-text-color: var(--ag-button-hover-text-color);
	--ag-inherited-button-text-color: var(--ag-button-text-color);
	--ag-inherited-button-vertical-padding: var(--ag-button-vertical-padding);
	--ag-inherited-calculated-column-highlight-color: var(--ag-calculated-column-highlight-color);
	--ag-inherited-calculated-column-parent-suggestion-color: var(--ag-calculated-column-parent-suggestion-color);
	--ag-inherited-calculated-column-suggestion-list-width: var(--ag-calculated-column-suggestion-list-width);
	--ag-inherited-card-shadow: var(--ag-card-shadow);
	--ag-inherited-cell-batch-edit-background-color: var(--ag-cell-batch-edit-background-color);
	--ag-inherited-cell-batch-edit-text-color: var(--ag-cell-batch-edit-text-color);
	--ag-inherited-cell-editing-border: var(--ag-cell-editing-border);
	--ag-inherited-cell-editing-shadow: var(--ag-cell-editing-shadow);
	--ag-inherited-cell-font-family: var(--ag-cell-font-family);
	--ag-inherited-cell-font-size: var(--ag-cell-font-size);
	--ag-inherited-cell-font-weight: var(--ag-cell-font-weight);
	--ag-inherited-cell-horizontal-padding: var(--ag-cell-horizontal-padding);
	--ag-inherited-cell-horizontal-padding-scale: var(--ag-cell-horizontal-padding-scale);
	--ag-inherited-cell-text-color: var(--ag-cell-text-color);
	--ag-inherited-cell-widget-spacing: var(--ag-cell-widget-spacing);
	--ag-inherited-chart-menu-label-color: var(--ag-chart-menu-label-color);
	--ag-inherited-chart-menu-panel-width: var(--ag-chart-menu-panel-width);
	--ag-inherited-checkbox-border-radius: var(--ag-checkbox-border-radius);
	--ag-inherited-checkbox-border-width: var(--ag-checkbox-border-width);
	--ag-inherited-checkbox-checked-background-color: var(--ag-checkbox-checked-background-color);
	--ag-inherited-checkbox-checked-border-color: var(--ag-checkbox-checked-border-color);
	--ag-inherited-checkbox-checked-shape-color: var(--ag-checkbox-checked-shape-color);
	--ag-inherited-checkbox-checked-shape-image: var(--ag-checkbox-checked-shape-image);
	--ag-inherited-checkbox-indeterminate-background-color: var(--ag-checkbox-indeterminate-background-color);
	--ag-inherited-checkbox-indeterminate-border-color: var(--ag-checkbox-indeterminate-border-color);
	--ag-inherited-checkbox-indeterminate-shape-color: var(--ag-checkbox-indeterminate-shape-color);
	--ag-inherited-checkbox-indeterminate-shape-image: var(--ag-checkbox-indeterminate-shape-image);
	--ag-inherited-checkbox-unchecked-background-color: var(--ag-checkbox-unchecked-background-color);
	--ag-inherited-checkbox-unchecked-border-color: var(--ag-checkbox-unchecked-border-color);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-color-picker-color-border-radius: var(--ag-color-picker-color-border-radius);
	--ag-inherited-color-picker-thumb-border-width: var(--ag-color-picker-thumb-border-width);
	--ag-inherited-color-picker-thumb-size: var(--ag-color-picker-thumb-size);
	--ag-inherited-color-picker-track-border-radius: var(--ag-color-picker-track-border-radius);
	--ag-inherited-color-picker-track-size: var(--ag-color-picker-track-size);
	--ag-inherited-column-border: var(--ag-column-border);
	--ag-inherited-column-drag-indicator-color: var(--ag-column-drag-indicator-color);
	--ag-inherited-column-drag-indicator-width: var(--ag-column-drag-indicator-width);
	--ag-inherited-column-drop-cell-background-color: var(--ag-column-drop-cell-background-color);
	--ag-inherited-column-drop-cell-border: var(--ag-column-drop-cell-border);
	--ag-inherited-column-drop-cell-drag-handle-color: var(--ag-column-drop-cell-drag-handle-color);
	--ag-inherited-column-drop-cell-text-color: var(--ag-column-drop-cell-text-color);
	--ag-inherited-column-hover-color: var(--ag-column-hover-color);
	--ag-inherited-column-panel-apply-button-background-color: var(--ag-column-panel-apply-button-background-color);
	--ag-inherited-column-panel-apply-button-color: var(--ag-column-panel-apply-button-color);
	--ag-inherited-column-select-indent-size: var(--ag-column-select-indent-size);
	--ag-inherited-data-background-color: var(--ag-data-background-color);
	--ag-inherited-data-font-size: var(--ag-data-font-size);
	--ag-inherited-dialog-border: var(--ag-dialog-border);
	--ag-inherited-dialog-shadow: var(--ag-dialog-shadow);
	--ag-inherited-drag-and-drop-image-background-color: var(--ag-drag-and-drop-image-background-color);
	--ag-inherited-drag-and-drop-image-border: var(--ag-drag-and-drop-image-border);
	--ag-inherited-drag-and-drop-image-not-allowed-border: var(--ag-drag-and-drop-image-not-allowed-border);
	--ag-inherited-drag-and-drop-image-shadow: var(--ag-drag-and-drop-image-shadow);
	--ag-inherited-drag-handle-color: var(--ag-drag-handle-color);
	--ag-inherited-dropdown-shadow: var(--ag-dropdown-shadow);
	--ag-inherited-filter-panel-apply-button-background-color: var(--ag-filter-panel-apply-button-background-color);
	--ag-inherited-filter-panel-apply-button-color: var(--ag-filter-panel-apply-button-color);
	--ag-inherited-filter-panel-card-subtle-color: var(--ag-filter-panel-card-subtle-color);
	--ag-inherited-filter-panel-card-subtle-hover-color: var(--ag-filter-panel-card-subtle-hover-color);
	--ag-inherited-filter-tool-panel-group-indent: var(--ag-filter-tool-panel-group-indent);
	--ag-inherited-find-active-match-background-color: var(--ag-find-active-match-background-color);
	--ag-inherited-find-active-match-color: var(--ag-find-active-match-color);
	--ag-inherited-find-match-background-color: var(--ag-find-match-background-color);
	--ag-inherited-find-match-color: var(--ag-find-match-color);
	--ag-inherited-focus-error-shadow: var(--ag-focus-error-shadow);
	--ag-inherited-focus-shadow: var(--ag-focus-shadow);
	--ag-inherited-font-family: var(--ag-font-family);
	--ag-inherited-font-size: var(--ag-font-size);
	--ag-inherited-font-weight: var(--ag-font-weight);
	--ag-inherited-footer-row-border: var(--ag-footer-row-border);
	--ag-inherited-foreground-color: var(--ag-foreground-color);
	--ag-inherited-formula-token-1-background-color: var(--ag-formula-token-1-background-color);
	--ag-inherited-formula-token-1-border: var(--ag-formula-token-1-border);
	--ag-inherited-formula-token-1-color: var(--ag-formula-token-1-color);
	--ag-inherited-formula-token-2-background-color: var(--ag-formula-token-2-background-color);
	--ag-inherited-formula-token-2-border: var(--ag-formula-token-2-border);
	--ag-inherited-formula-token-2-color: var(--ag-formula-token-2-color);
	--ag-inherited-formula-token-3-background-color: var(--ag-formula-token-3-background-color);
	--ag-inherited-formula-token-3-border: var(--ag-formula-token-3-border);
	--ag-inherited-formula-token-3-color: var(--ag-formula-token-3-color);
	--ag-inherited-formula-token-4-background-color: var(--ag-formula-token-4-background-color);
	--ag-inherited-formula-token-4-border: var(--ag-formula-token-4-border);
	--ag-inherited-formula-token-4-color: var(--ag-formula-token-4-color);
	--ag-inherited-formula-token-5-background-color: var(--ag-formula-token-5-background-color);
	--ag-inherited-formula-token-5-border: var(--ag-formula-token-5-border);
	--ag-inherited-formula-token-5-color: var(--ag-formula-token-5-color);
	--ag-inherited-formula-token-6-background-color: var(--ag-formula-token-6-background-color);
	--ag-inherited-formula-token-6-border: var(--ag-formula-token-6-border);
	--ag-inherited-formula-token-6-color: var(--ag-formula-token-6-color);
	--ag-inherited-formula-token-7-background-color: var(--ag-formula-token-7-background-color);
	--ag-inherited-formula-token-7-border: var(--ag-formula-token-7-border);
	--ag-inherited-formula-token-7-color: var(--ag-formula-token-7-color);
	--ag-inherited-full-row-edit-invalid-background-color: var(--ag-full-row-edit-invalid-background-color);
	--ag-inherited-header-background-color: var(--ag-header-background-color);
	--ag-inherited-header-cell-background-transition-duration: var(--ag-header-cell-background-transition-duration);
	--ag-inherited-header-cell-hover-background-color: var(--ag-header-cell-hover-background-color);
	--ag-inherited-header-cell-moving-background-color: var(--ag-header-cell-moving-background-color);
	--ag-inherited-header-column-border: var(--ag-header-column-border);
	--ag-inherited-header-column-border-height: var(--ag-header-column-border-height);
	--ag-inherited-header-column-resize-handle-color: var(--ag-header-column-resize-handle-color);
	--ag-inherited-header-column-resize-handle-height: var(--ag-header-column-resize-handle-height);
	--ag-inherited-header-column-resize-handle-width: var(--ag-header-column-resize-handle-width);
	--ag-inherited-header-font-family: var(--ag-header-font-family);
	--ag-inherited-header-font-size: var(--ag-header-font-size);
	--ag-inherited-header-font-weight: var(--ag-header-font-weight);
	--ag-inherited-header-height: var(--ag-header-height);
	--ag-inherited-header-row-border: var(--ag-header-row-border);
	--ag-inherited-header-text-color: var(--ag-header-text-color);
	--ag-inherited-header-vertical-padding-scale: var(--ag-header-vertical-padding-scale);
	--ag-inherited-icon-button-active-background-color: var(--ag-icon-button-active-background-color);
	--ag-inherited-icon-button-active-color: var(--ag-icon-button-active-color);
	--ag-inherited-icon-button-active-indicator-color: var(--ag-icon-button-active-indicator-color);
	--ag-inherited-icon-button-background-color: var(--ag-icon-button-background-color);
	--ag-inherited-icon-button-background-spread: var(--ag-icon-button-background-spread);
	--ag-inherited-icon-button-border-radius: var(--ag-icon-button-border-radius);
	--ag-inherited-icon-button-color: var(--ag-icon-button-color);
	--ag-inherited-icon-button-hover-background-color: var(--ag-icon-button-hover-background-color);
	--ag-inherited-icon-button-hover-color: var(--ag-icon-button-hover-color);
	--ag-inherited-icon-color: var(--ag-icon-color);
	--ag-inherited-icon-size: var(--ag-icon-size);
	--ag-inherited-input-background-color: var(--ag-input-background-color);
	--ag-inherited-input-border: var(--ag-input-border);
	--ag-inherited-input-border-radius: var(--ag-input-border-radius);
	--ag-inherited-input-disabled-background-color: var(--ag-input-disabled-background-color);
	--ag-inherited-input-disabled-border: var(--ag-input-disabled-border);
	--ag-inherited-input-disabled-text-color: var(--ag-input-disabled-text-color);
	--ag-inherited-input-focus-background-color: var(--ag-input-focus-background-color);
	--ag-inherited-input-focus-border: var(--ag-input-focus-border);
	--ag-inherited-input-focus-shadow: var(--ag-input-focus-shadow);
	--ag-inherited-input-focus-text-color: var(--ag-input-focus-text-color);
	--ag-inherited-input-height: var(--ag-input-height);
	--ag-inherited-input-icon-color: var(--ag-input-icon-color);
	--ag-inherited-input-invalid-background-color: var(--ag-input-invalid-background-color);
	--ag-inherited-input-invalid-border: var(--ag-input-invalid-border);
	--ag-inherited-input-invalid-text-color: var(--ag-input-invalid-text-color);
	--ag-inherited-input-padding-start: var(--ag-input-padding-start);
	--ag-inherited-input-placeholder-text-color: var(--ag-input-placeholder-text-color);
	--ag-inherited-input-text-color: var(--ag-input-text-color);
	--ag-inherited-invalid-color: var(--ag-invalid-color);
	--ag-inherited-list-item-height: var(--ag-list-item-height);
	--ag-inherited-menu-background-color: var(--ag-menu-background-color);
	--ag-inherited-menu-border: var(--ag-menu-border);
	--ag-inherited-menu-separator-color: var(--ag-menu-separator-color);
	--ag-inherited-menu-shadow: var(--ag-menu-shadow);
	--ag-inherited-menu-text-color: var(--ag-menu-text-color);
	--ag-inherited-modal-overlay-background-color: var(--ag-modal-overlay-background-color);
	--ag-inherited-note-indicator-color: var(--ag-note-indicator-color);
	--ag-inherited-note-indicator-size: var(--ag-note-indicator-size);
	--ag-inherited-note-popup-background-color: var(--ag-note-popup-background-color);
	--ag-inherited-note-popup-border: var(--ag-note-popup-border);
	--ag-inherited-note-popup-input-background-color: var(--ag-note-popup-input-background-color);
	--ag-inherited-note-popup-input-text-color: var(--ag-note-popup-input-text-color);
	--ag-inherited-note-popup-padding: var(--ag-note-popup-padding);
	--ag-inherited-note-popup-text-color: var(--ag-note-popup-text-color);
	--ag-inherited-odd-row-background-color: var(--ag-odd-row-background-color);
	--ag-inherited-pagination-panel-height: var(--ag-pagination-panel-height);
	--ag-inherited-panel-background-color: var(--ag-panel-background-color);
	--ag-inherited-panel-title-bar-background-color: var(--ag-panel-title-bar-background-color);
	--ag-inherited-panel-title-bar-border: var(--ag-panel-title-bar-border);
	--ag-inherited-panel-title-bar-font-family: var(--ag-panel-title-bar-font-family);
	--ag-inherited-panel-title-bar-font-size: var(--ag-panel-title-bar-font-size);
	--ag-inherited-panel-title-bar-font-weight: var(--ag-panel-title-bar-font-weight);
	--ag-inherited-panel-title-bar-height: var(--ag-panel-title-bar-height);
	--ag-inherited-panel-title-bar-icon-color: var(--ag-panel-title-bar-icon-color);
	--ag-inherited-panel-title-bar-text-color: var(--ag-panel-title-bar-text-color);
	--ag-inherited-picker-button-background-color: var(--ag-picker-button-background-color);
	--ag-inherited-picker-button-border: var(--ag-picker-button-border);
	--ag-inherited-picker-button-border-radius: var(--ag-picker-button-border-radius);
	--ag-inherited-picker-button-focus-background-color: var(--ag-picker-button-focus-background-color);
	--ag-inherited-picker-button-focus-border: var(--ag-picker-button-focus-border);
	--ag-inherited-picker-field-height: var(--ag-picker-field-height);
	--ag-inherited-picker-list-background-color: var(--ag-picker-list-background-color);
	--ag-inherited-picker-list-border: var(--ag-picker-list-border);
	--ag-inherited-pinned-column-border: var(--ag-pinned-column-border);
	--ag-inherited-pinned-row-background-color: var(--ag-pinned-row-background-color);
	--ag-inherited-pinned-row-border: var(--ag-pinned-row-border);
	--ag-inherited-pinned-row-font-weight: var(--ag-pinned-row-font-weight);
	--ag-inherited-pinned-row-text-color: var(--ag-pinned-row-text-color);
	--ag-inherited-pinned-source-row-background-color: var(--ag-pinned-source-row-background-color);
	--ag-inherited-pinned-source-row-font-weight: var(--ag-pinned-source-row-font-weight);
	--ag-inherited-pinned-source-row-text-color: var(--ag-pinned-source-row-text-color);
	--ag-inherited-popup-shadow: var(--ag-popup-shadow);
	--ag-inherited-radio-checked-shape-image: var(--ag-radio-checked-shape-image);
	--ag-inherited-range-header-highlight-color: var(--ag-range-header-highlight-color);
	--ag-inherited-range-selection-background-color: var(--ag-range-selection-background-color);
	--ag-inherited-range-selection-border-color: var(--ag-range-selection-border-color);
	--ag-inherited-range-selection-border-style: var(--ag-range-selection-border-style);
	--ag-inherited-range-selection-chart-background-color: var(--ag-range-selection-chart-background-color);
	--ag-inherited-range-selection-chart-category-background-color: var(--ag-range-selection-chart-category-background-color);
	--ag-inherited-range-selection-highlight-color: var(--ag-range-selection-highlight-color);
	--ag-inherited-row-batch-edit-background-color: var(--ag-row-batch-edit-background-color);
	--ag-inherited-row-batch-edit-text-color: var(--ag-row-batch-edit-text-color);
	--ag-inherited-row-border: var(--ag-row-border);
	--ag-inherited-row-drag-indicator-color: var(--ag-row-drag-indicator-color);
	--ag-inherited-row-drag-indicator-width: var(--ag-row-drag-indicator-width);
	--ag-inherited-row-group-indent-size: var(--ag-row-group-indent-size);
	--ag-inherited-row-height: var(--ag-row-height);
	--ag-inherited-row-hover-color: var(--ag-row-hover-color);
	--ag-inherited-row-loading-skeleton-effect-color: var(--ag-row-loading-skeleton-effect-color);
	--ag-inherited-row-numbers-selected-color: var(--ag-row-numbers-selected-color);
	--ag-inherited-row-vertical-padding-scale: var(--ag-row-vertical-padding-scale);
	--ag-inherited-select-cell-background-color: var(--ag-select-cell-background-color);
	--ag-inherited-select-cell-border: var(--ag-select-cell-border);
	--ag-inherited-selected-row-background-color: var(--ag-selected-row-background-color);
	--ag-inherited-set-filter-indent-size: var(--ag-set-filter-indent-size);
	--ag-inherited-side-bar-background-color: var(--ag-side-bar-background-color);
	--ag-inherited-side-bar-panel-animation-duration: var(--ag-side-bar-panel-animation-duration);
	--ag-inherited-side-bar-panel-width: var(--ag-side-bar-panel-width);
	--ag-inherited-side-button-background-color: var(--ag-side-button-background-color);
	--ag-inherited-side-button-bar-background-color: var(--ag-side-button-bar-background-color);
	--ag-inherited-side-button-bar-top-padding: var(--ag-side-button-bar-top-padding);
	--ag-inherited-side-button-border: var(--ag-side-button-border);
	--ag-inherited-side-button-hover-background-color: var(--ag-side-button-hover-background-color);
	--ag-inherited-side-button-hover-text-color: var(--ag-side-button-hover-text-color);
	--ag-inherited-side-button-left-padding: var(--ag-side-button-left-padding);
	--ag-inherited-side-button-right-padding: var(--ag-side-button-right-padding);
	--ag-inherited-side-button-selected-background-color: var(--ag-side-button-selected-background-color);
	--ag-inherited-side-button-selected-border: var(--ag-side-button-selected-border);
	--ag-inherited-side-button-selected-text-color: var(--ag-side-button-selected-text-color);
	--ag-inherited-side-button-selected-underline-color: var(--ag-side-button-selected-underline-color);
	--ag-inherited-side-button-selected-underline-transition-duration: var(--ag-side-button-selected-underline-transition-duration);
	--ag-inherited-side-button-selected-underline-width: var(--ag-side-button-selected-underline-width);
	--ag-inherited-side-button-text-color: var(--ag-side-button-text-color);
	--ag-inherited-side-button-vertical-padding: var(--ag-side-button-vertical-padding);
	--ag-inherited-side-panel-border: var(--ag-side-panel-border);
	--ag-inherited-spacing: var(--ag-spacing);
	--ag-inherited-status-bar-label-color: var(--ag-status-bar-label-color);
	--ag-inherited-status-bar-label-font-weight: var(--ag-status-bar-label-font-weight);
	--ag-inherited-status-bar-value-color: var(--ag-status-bar-value-color);
	--ag-inherited-status-bar-value-font-weight: var(--ag-status-bar-value-font-weight);
	--ag-inherited-subtle-text-color: var(--ag-subtle-text-color);
	--ag-inherited-tab-background-color: var(--ag-tab-background-color);
	--ag-inherited-tab-bar-background-color: var(--ag-tab-bar-background-color);
	--ag-inherited-tab-bar-border: var(--ag-tab-bar-border);
	--ag-inherited-tab-bar-horizontal-padding: var(--ag-tab-bar-horizontal-padding);
	--ag-inherited-tab-bar-top-padding: var(--ag-tab-bar-top-padding);
	--ag-inherited-tab-bottom-padding: var(--ag-tab-bottom-padding);
	--ag-inherited-tab-horizontal-padding: var(--ag-tab-horizontal-padding);
	--ag-inherited-tab-hover-background-color: var(--ag-tab-hover-background-color);
	--ag-inherited-tab-hover-text-color: var(--ag-tab-hover-text-color);
	--ag-inherited-tab-selected-background-color: var(--ag-tab-selected-background-color);
	--ag-inherited-tab-selected-border-color: var(--ag-tab-selected-border-color);
	--ag-inherited-tab-selected-border-width: var(--ag-tab-selected-border-width);
	--ag-inherited-tab-selected-text-color: var(--ag-tab-selected-text-color);
	--ag-inherited-tab-selected-underline-color: var(--ag-tab-selected-underline-color);
	--ag-inherited-tab-selected-underline-transition-duration: var(--ag-tab-selected-underline-transition-duration);
	--ag-inherited-tab-selected-underline-width: var(--ag-tab-selected-underline-width);
	--ag-inherited-tab-spacing: var(--ag-tab-spacing);
	--ag-inherited-tab-text-color: var(--ag-tab-text-color);
	--ag-inherited-tab-top-padding: var(--ag-tab-top-padding);
	--ag-inherited-text-color: var(--ag-text-color);
	--ag-inherited-toggle-button-height: var(--ag-toggle-button-height);
	--ag-inherited-toggle-button-off-background-color: var(--ag-toggle-button-off-background-color);
	--ag-inherited-toggle-button-on-background-color: var(--ag-toggle-button-on-background-color);
	--ag-inherited-toggle-button-switch-background-color: var(--ag-toggle-button-switch-background-color);
	--ag-inherited-toggle-button-switch-inset: var(--ag-toggle-button-switch-inset);
	--ag-inherited-toggle-button-width: var(--ag-toggle-button-width);
	--ag-inherited-tool-panel-separator-border: var(--ag-tool-panel-separator-border);
	--ag-inherited-toolbar-background-color: var(--ag-toolbar-background-color);
	--ag-inherited-toolbar-separator-border: var(--ag-toolbar-separator-border);
	--ag-inherited-toolbar-text-color: var(--ag-toolbar-text-color);
	--ag-inherited-tooltip-background-color: var(--ag-tooltip-background-color);
	--ag-inherited-tooltip-border: var(--ag-tooltip-border);
	--ag-inherited-tooltip-error-background-color: var(--ag-tooltip-error-background-color);
	--ag-inherited-tooltip-error-border: var(--ag-tooltip-error-border);
	--ag-inherited-tooltip-error-text-color: var(--ag-tooltip-error-text-color);
	--ag-inherited-tooltip-text-color: var(--ag-tooltip-text-color);
	--ag-inherited-value-change-delta-down-color: var(--ag-value-change-delta-down-color);
	--ag-inherited-value-change-delta-up-color: var(--ag-value-change-delta-up-color);
	--ag-inherited-value-change-value-highlight-background-color: var(--ag-value-change-value-highlight-background-color);
	--ag-inherited-widget-container-horizontal-padding: var(--ag-widget-container-horizontal-padding);
	--ag-inherited-widget-container-vertical-padding: var(--ag-widget-container-vertical-padding);
	--ag-inherited-widget-horizontal-spacing: var(--ag-widget-horizontal-spacing);
	--ag-inherited-widget-vertical-spacing: var(--ag-widget-vertical-spacing);
	--ag-inherited-wrapper-background-color: var(--ag-wrapper-background-color);
	--ag-inherited-wrapper-border: var(--ag-wrapper-border);
	--ag-inherited-wrapper-border-radius: var(--ag-wrapper-border-radius);
:where(html[data-ag-theme-mode="light"],body[data-ag-theme-mode="light"],.ag-theme-mode[data-ag-theme-mode="light"]) & {
	--ag-inherited-background-color: var(--ag-background-color);
	--ag-inherited-border-color: var(--ag-border-color);
	--ag-inherited-browser-color-scheme: var(--ag-browser-color-scheme);
	--ag-inherited-chrome-background-color: var(--ag-chrome-background-color);
	--ag-inherited-foreground-color: var(--ag-foreground-color);
}
:where(.ag-theme-params-1) {
	--ag-accent-color: var(--ag-inherited-accent-color, #235069);
	--ag-advanced-filter-builder-button-bar-border: var(--ag-inherited-advanced-filter-builder-button-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-advanced-filter-builder-column-pill-color: var(--ag-inherited-advanced-filter-builder-column-pill-color, #a6e194);
	--ag-advanced-filter-builder-indent-size: var(--ag-inherited-advanced-filter-builder-indent-size, calc( var(--ag-spacing)   *  2  +   var(--ag-icon-size) ));
	--ag-advanced-filter-builder-join-pill-color: var(--ag-inherited-advanced-filter-builder-join-pill-color, #f08e8d);
	--ag-advanced-filter-builder-option-pill-color: var(--ag-inherited-advanced-filter-builder-option-pill-color, #f3c08b);
	--ag-advanced-filter-builder-value-pill-color: var(--ag-inherited-advanced-filter-builder-value-pill-color, #85c0e4);
	--ag-auto-height-min-body-height: var(--ag-inherited-auto-height-min-body-height, 150px);
	--ag-background-color: var(--ag-inherited-background-color, #fff);
	--ag-border-color: var(--ag-inherited-border-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 15%));
	--ag-border-radius: var(--ag-inherited-border-radius, 4px);
	--ag-border-width: var(--ag-inherited-border-width, 1px);
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-button-active-background-color: var(--ag-inherited-button-active-background-color, var(--ag-button-hover-background-color));
	--ag-button-active-border: var(--ag-inherited-button-active-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-button-active-text-color: var(--ag-inherited-button-active-text-color, var(--ag-button-hover-text-color));
	--ag-button-background-color: var(--ag-inherited-button-background-color, var(--ag-background-color));
	--ag-button-border: var(--ag-inherited-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-button-border-radius: var(--ag-inherited-button-border-radius, var(--ag-border-radius));
	--ag-button-disabled-background-color: var(--ag-inherited-button-disabled-background-color, var(--ag-input-disabled-background-color));
	--ag-button-disabled-border: var(--ag-inherited-button-disabled-border, var(--ag-input-disabled-border));
	--ag-button-disabled-text-color: var(--ag-inherited-button-disabled-text-color, var(--ag-input-disabled-text-color));
	--ag-button-font-weight: var(--ag-inherited-button-font-weight, normal);
	--ag-button-horizontal-padding: var(--ag-inherited-button-horizontal-padding, calc( var(--ag-spacing)   *  2));
	--ag-button-hover-background-color: var(--ag-inherited-button-hover-background-color, var(--ag-row-hover-color));
	--ag-button-hover-border: var(--ag-inherited-button-hover-border, var(--ag-button-border));
	--ag-button-hover-text-color: var(--ag-inherited-button-hover-text-color, var(--ag-button-text-color));
	--ag-button-text-color: var(--ag-inherited-button-text-color, inherit);
	--ag-button-vertical-padding: var(--ag-inherited-button-vertical-padding, var(--ag-spacing));
	--ag-calculated-column-highlight-color: var(--ag-inherited-calculated-column-highlight-color, color-mix(in srgb, transparent, var(--ag-accent-color) 12%));
	--ag-calculated-column-parent-suggestion-color: var(--ag-inherited-calculated-column-parent-suggestion-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 75%));
	--ag-calculated-column-suggestion-list-width: var(--ag-inherited-calculated-column-suggestion-list-width, 200px);
	--ag-card-shadow: var(--ag-inherited-card-shadow, 0 1px 4px 1px #00000018);
	--ag-cell-batch-edit-background-color: var(--ag-inherited-cell-batch-edit-background-color, rgba(220 181 139 / 16%));
	--ag-cell-batch-edit-text-color: var(--ag-inherited-cell-batch-edit-text-color, #422f00);
	--ag-cell-editing-border: var(--ag-inherited-cell-editing-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-cell-editing-shadow: var(--ag-inherited-cell-editing-shadow, var(--ag-card-shadow));
	--ag-cell-font-family: var(--ag-inherited-cell-font-family, var(--ag-font-family));
	--ag-cell-font-size: var(--ag-inherited-cell-font-size, var(--ag-data-font-size));
	--ag-cell-font-weight: var(--ag-inherited-cell-font-weight, var(--ag-font-weight));
	--ag-cell-horizontal-padding: var(--ag-inherited-cell-horizontal-padding, calc( var(--ag-spacing)   *  2  *   var(--ag-cell-horizontal-padding-scale) ));
	--ag-cell-horizontal-padding-scale: var(--ag-inherited-cell-horizontal-padding-scale, 1);
	--ag-cell-text-color: var(--ag-inherited-cell-text-color, var(--ag-text-color));
	--ag-cell-widget-spacing: var(--ag-inherited-cell-widget-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-chart-menu-label-color: var(--ag-inherited-chart-menu-label-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 80%));
	--ag-chart-menu-panel-width: var(--ag-inherited-chart-menu-panel-width, 260px);
	--ag-checkbox-border-radius: var(--ag-inherited-checkbox-border-radius, var(--ag-border-radius));
	--ag-checkbox-border-width: var(--ag-inherited-checkbox-border-width, 1px);
	--ag-checkbox-checked-background-color: var(--ag-inherited-checkbox-checked-background-color, var(--ag-accent-color));
	--ag-checkbox-checked-border-color: var(--ag-inherited-checkbox-checked-border-color, var(--ag-checkbox-checked-background-color));
	--ag-checkbox-checked-shape-color: var(--ag-inherited-checkbox-checked-shape-color, var(--ag-background-color));
	--ag-checkbox-checked-shape-image: var(--ag-inherited-checkbox-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%227%22%20fill%3D%22none%22%3E%3Cpath%20stroke%3D%22%23000%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.75%22%20d%3D%22M1%203.5%203.5%206l5-5%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-indeterminate-background-color: var(--ag-inherited-checkbox-indeterminate-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-checkbox-indeterminate-border-color: var(--ag-inherited-checkbox-indeterminate-border-color, var(--ag-checkbox-indeterminate-background-color));
	--ag-checkbox-indeterminate-shape-color: var(--ag-inherited-checkbox-indeterminate-shape-color, var(--ag-background-color));
	--ag-checkbox-indeterminate-shape-image: var(--ag-inherited-checkbox-indeterminate-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2210%22%20height%3D%222%22%20fill%3D%22%23000%22%20rx%3D%221%22%2F%3E%3C%2Fsvg%3E"));
	--ag-checkbox-unchecked-background-color: var(--ag-inherited-checkbox-unchecked-background-color, var(--ag-background-color));
	--ag-checkbox-unchecked-border-color: var(--ag-inherited-checkbox-unchecked-border-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
	--ag-color-picker-color-border-radius: var(--ag-inherited-color-picker-color-border-radius, 4px);
	--ag-color-picker-thumb-border-width: var(--ag-inherited-color-picker-thumb-border-width, 3px);
	--ag-color-picker-thumb-size: var(--ag-inherited-color-picker-thumb-size, 18px);
	--ag-color-picker-track-border-radius: var(--ag-inherited-color-picker-track-border-radius, 12px);
	--ag-color-picker-track-size: var(--ag-inherited-color-picker-track-size, 12px);
	--ag-column-border: var(--ag-inherited-column-border, solid 1px transparent);
	--ag-column-drag-indicator-color: var(--ag-inherited-column-drag-indicator-color, var(--ag-accent-color));
	--ag-column-drag-indicator-width: var(--ag-inherited-column-drag-indicator-width, 2px);
	--ag-column-drop-cell-background-color: var(--ag-inherited-column-drop-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-column-drop-cell-border: var(--ag-inherited-column-drop-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-column-drop-cell-drag-handle-color: var(--ag-inherited-column-drop-cell-drag-handle-color, var(--ag-text-color));
	--ag-column-drop-cell-text-color: var(--ag-inherited-column-drop-cell-text-color, var(--ag-text-color));
	--ag-column-hover-color: var(--ag-inherited-column-hover-color, color-mix(in srgb, transparent, var(--ag-accent-color) 5%));
	--ag-column-panel-apply-button-background-color: var(--ag-inherited-column-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-column-panel-apply-button-color: var(--ag-inherited-column-panel-apply-button-color, var(--ag-background-color));
	--ag-column-select-indent-size: var(--ag-inherited-column-select-indent-size, var(--ag-icon-size));
	--ag-data-background-color: var(--ag-inherited-data-background-color, var(--ag-background-color));
	--ag-data-font-size: var(--ag-inherited-data-font-size, var(--ag-font-size));
	--ag-dialog-border: var(--ag-inherited-dialog-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-dialog-shadow: var(--ag-inherited-dialog-shadow, var(--ag-popup-shadow));
	--ag-drag-and-drop-image-background-color: var(--ag-inherited-drag-and-drop-image-background-color, var(--ag-background-color));
	--ag-drag-and-drop-image-border: var(--ag-inherited-drag-and-drop-image-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-drag-and-drop-image-not-allowed-border: var(--ag-inherited-drag-and-drop-image-not-allowed-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-drag-and-drop-image-background-color), var(--ag-invalid-color) 50%));
	--ag-drag-and-drop-image-shadow: var(--ag-inherited-drag-and-drop-image-shadow, var(--ag-popup-shadow));
	--ag-drag-handle-color: var(--ag-inherited-drag-handle-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 70%));
	--ag-dropdown-shadow: var(--ag-inherited-dropdown-shadow, var(--ag-card-shadow));
	--ag-filter-panel-apply-button-background-color: var(--ag-inherited-filter-panel-apply-button-background-color, var(--ag-accent-color));
	--ag-filter-panel-apply-button-color: var(--ag-inherited-filter-panel-apply-button-color, var(--ag-background-color));
	--ag-filter-panel-card-subtle-color: var(--ag-inherited-filter-panel-card-subtle-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-filter-panel-card-subtle-hover-color: var(--ag-inherited-filter-panel-card-subtle-hover-color, var(--ag-text-color));
	--ag-filter-tool-panel-group-indent: var(--ag-inherited-filter-tool-panel-group-indent, var(--ag-spacing));
	--ag-find-active-match-background-color: var(--ag-inherited-find-active-match-background-color, #ffa500);
	--ag-find-active-match-color: var(--ag-inherited-find-active-match-color, var(--ag-foreground-color));
	--ag-find-match-background-color: var(--ag-inherited-find-match-background-color, #ffff00);
	--ag-find-match-color: var(--ag-inherited-find-match-color, var(--ag-foreground-color));
	--ag-focus-error-shadow: var(--ag-inherited-focus-error-shadow, 0px 0px 0px 3px color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 50%));
	--ag-focus-shadow: var(--ag-inherited-focus-shadow, 0px 0px 0px 3px color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-font-family: var(--ag-inherited-font-family, DM Sans, system-ui, sans-serif);
	--ag-font-size: var(--ag-inherited-font-size, 14px);
	--ag-font-weight: var(--ag-inherited-font-weight, 400);
	--ag-footer-row-border: var(--ag-inherited-footer-row-border, var(--ag-row-border));
	--ag-foreground-color: var(--ag-inherited-foreground-color, #181d1f);
	--ag-formula-token-1-background-color: var(--ag-inherited-formula-token-1-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-1-color) 8%));
	--ag-formula-token-1-border: var(--ag-inherited-formula-token-1-border, solid var(--ag-border-width) var(--ag-formula-token-1-color));
	--ag-formula-token-1-color: var(--ag-inherited-formula-token-1-color, #3269c6);
	--ag-formula-token-2-background-color: var(--ag-inherited-formula-token-2-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-2-color) 6%));
	--ag-formula-token-2-border: var(--ag-inherited-formula-token-2-border, solid var(--ag-border-width) var(--ag-formula-token-2-color));
	--ag-formula-token-2-color: var(--ag-inherited-formula-token-2-color, #c0343f);
	--ag-formula-token-3-background-color: var(--ag-inherited-formula-token-3-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-3-color) 8%));
	--ag-formula-token-3-border: var(--ag-inherited-formula-token-3-border, solid var(--ag-border-width) var(--ag-formula-token-3-color));
	--ag-formula-token-3-color: var(--ag-inherited-formula-token-3-color, #8156b8);
	--ag-formula-token-4-background-color: var(--ag-inherited-formula-token-4-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-4-color) 6%));
	--ag-formula-token-4-border: var(--ag-inherited-formula-token-4-border, solid var(--ag-border-width) var(--ag-formula-token-4-color));
	--ag-formula-token-4-color: var(--ag-inherited-formula-token-4-color, #007c1f);
	--ag-formula-token-5-background-color: var(--ag-inherited-formula-token-5-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-5-color) 8%));
	--ag-formula-token-5-border: var(--ag-inherited-formula-token-5-border, solid var(--ag-border-width) var(--ag-formula-token-5-color));
	--ag-formula-token-5-color: var(--ag-inherited-formula-token-5-color, #b03e85);
	--ag-formula-token-6-background-color: var(--ag-inherited-formula-token-6-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-6-color) 6%));
	--ag-formula-token-6-border: var(--ag-inherited-formula-token-6-border, solid var(--ag-border-width) var(--ag-formula-token-6-color));
	--ag-formula-token-6-color: var(--ag-inherited-formula-token-6-color, #b74900);
	--ag-formula-token-7-background-color: var(--ag-inherited-formula-token-7-background-color, color-mix(in srgb, transparent, var(--ag-formula-token-7-color) 8%));
	--ag-formula-token-7-border: var(--ag-inherited-formula-token-7-border, solid var(--ag-border-width) var(--ag-formula-token-7-color));
	--ag-formula-token-7-color: var(--ag-inherited-formula-token-7-color, #247492);
	--ag-full-row-edit-invalid-background-color: var(--ag-inherited-full-row-edit-invalid-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-header-background-color: var(--ag-inherited-header-background-color, #235069);
	--ag-header-cell-background-transition-duration: var(--ag-inherited-header-cell-background-transition-duration, 0.2s);
	--ag-header-cell-hover-background-color: var(--ag-inherited-header-cell-hover-background-color, transparent);
	--ag-header-cell-moving-background-color: var(--ag-inherited-header-cell-moving-background-color, var(--ag-header-cell-hover-background-color));
	--ag-header-column-border: var(--ag-inherited-header-column-border, none);
	--ag-header-column-border-height: var(--ag-inherited-header-column-border-height, 100%);
	--ag-header-column-resize-handle-color: var(--ag-inherited-header-column-resize-handle-color, var(--ag-border-color));
	--ag-header-column-resize-handle-height: var(--ag-inherited-header-column-resize-handle-height, 30%);
	--ag-header-column-resize-handle-width: var(--ag-inherited-header-column-resize-handle-width, 2px);
	--ag-header-font-family: var(--ag-inherited-header-font-family, var(--ag-font-family));
	--ag-header-font-size: var(--ag-inherited-header-font-size, 14px);
	--ag-header-font-weight: var(--ag-inherited-header-font-weight, 600);
	--ag-header-height: var(--ag-inherited-header-height, calc(max( var(--ag-icon-size) ,  var(--ag-header-font-size) )  +   var(--ag-spacing)   *  4  *   var(--ag-header-vertical-padding-scale) ));
	--ag-header-row-border: var(--ag-inherited-header-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-header-text-color: var(--ag-inherited-header-text-color, #ffffff);
	--ag-header-vertical-padding-scale: var(--ag-inherited-header-vertical-padding-scale, 1);
	--ag-icon-button-active-background-color: var(--ag-inherited-icon-button-active-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 28.000000000000004%));
	--ag-icon-button-active-color: var(--ag-inherited-icon-button-active-color, var(--ag-accent-color));
	--ag-icon-button-active-indicator-color: var(--ag-inherited-icon-button-active-indicator-color, var(--ag-accent-color));
	--ag-icon-button-background-color: var(--ag-inherited-icon-button-background-color, transparent);
	--ag-icon-button-background-spread: var(--ag-inherited-icon-button-background-spread, 4px);
	--ag-icon-button-border-radius: var(--ag-inherited-icon-button-border-radius, 1px);
	--ag-icon-button-color: var(--ag-inherited-icon-button-color, var(--ag-icon-color));
	--ag-icon-button-hover-background-color: var(--ag-inherited-icon-button-hover-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 10%));
	--ag-icon-button-hover-color: var(--ag-inherited-icon-button-hover-color, var(--ag-icon-button-color));
	--ag-icon-color: var(--ag-inherited-icon-color, inherit);
	--ag-icon-size: var(--ag-inherited-icon-size, 16px);
	--ag-input-background-color: var(--ag-inherited-input-background-color, var(--ag-background-color));
	--ag-input-border: var(--ag-inherited-input-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-input-border-radius: var(--ag-inherited-input-border-radius, var(--ag-border-radius));
	--ag-input-disabled-background-color: var(--ag-inherited-input-disabled-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 6%));
	--ag-input-disabled-border: var(--ag-inherited-input-disabled-border, var(--ag-input-border));
	--ag-input-disabled-text-color: var(--ag-inherited-input-disabled-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-input-focus-background-color: var(--ag-inherited-input-focus-background-color, var(--ag-input-background-color));
	--ag-input-focus-border: var(--ag-inherited-input-focus-border, solid var(--ag-border-width) var(--ag-accent-color));
	--ag-input-focus-shadow: var(--ag-inherited-input-focus-shadow, var(--ag-focus-shadow));
	--ag-input-focus-text-color: var(--ag-inherited-input-focus-text-color, var(--ag-input-text-color));
	--ag-input-height: var(--ag-inherited-input-height, calc(max( var(--ag-icon-size) ,  var(--ag-font-size) )  +   var(--ag-spacing)   *  2));
	--ag-input-icon-color: var(--ag-inherited-input-icon-color, var(--ag-input-text-color));
	--ag-input-invalid-background-color: var(--ag-inherited-input-invalid-background-color, var(--ag-input-background-color));
	--ag-input-invalid-border: var(--ag-inherited-input-invalid-border, solid var(--ag-border-width) var(--ag-invalid-color));
	--ag-input-invalid-text-color: var(--ag-inherited-input-invalid-text-color, var(--ag-input-text-color));
	--ag-input-padding-start: var(--ag-inherited-input-padding-start, var(--ag-spacing));
	--ag-input-placeholder-text-color: var(--ag-inherited-input-placeholder-text-color, color-mix(in srgb, transparent, var(--ag-input-text-color) 50%));
	--ag-input-text-color: var(--ag-inherited-input-text-color, var(--ag-text-color));
	--ag-invalid-color: var(--ag-inherited-invalid-color, #e02525);
	--ag-list-item-height: var(--ag-inherited-list-item-height, calc(max( var(--ag-icon-size) ,  var(--ag-data-font-size) )  +   var(--ag-widget-vertical-spacing) ));
	--ag-menu-background-color: var(--ag-inherited-menu-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 3%));
	--ag-menu-border: var(--ag-inherited-menu-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 20%));
	--ag-menu-separator-color: var(--ag-inherited-menu-separator-color, var(--ag-border-color));
	--ag-menu-shadow: var(--ag-inherited-menu-shadow, var(--ag-popup-shadow));
	--ag-menu-text-color: var(--ag-inherited-menu-text-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 95%));
	--ag-modal-overlay-background-color: var(--ag-inherited-modal-overlay-background-color, color-mix(in srgb, transparent, var(--ag-background-color) 66%));
	--ag-note-indicator-color: var(--ag-inherited-note-indicator-color, var(--ag-accent-color));
	--ag-note-indicator-size: var(--ag-inherited-note-indicator-size, 8px);
	--ag-note-popup-background-color: var(--ag-inherited-note-popup-background-color, var(--ag-menu-background-color));
	--ag-note-popup-border: var(--ag-inherited-note-popup-border, var(--ag-dialog-border));
	--ag-note-popup-input-background-color: var(--ag-inherited-note-popup-input-background-color, var(--ag-input-background-color));
	--ag-note-popup-input-text-color: var(--ag-inherited-note-popup-input-text-color, var(--ag-input-text-color));
	--ag-note-popup-padding: var(--ag-inherited-note-popup-padding, calc( var(--ag-spacing)   *  0.5));
	--ag-note-popup-text-color: var(--ag-inherited-note-popup-text-color, color-mix(in srgb, transparent, var(--ag-menu-text-color) 75%));
	--ag-odd-row-background-color: var(--ag-inherited-odd-row-background-color, #f5f8fb);
	--ag-pagination-panel-height: var(--ag-inherited-pagination-panel-height, calc( var(--ag-picker-field-height)   +   var(--ag-spacing)   *  1.25));
	--ag-panel-background-color: var(--ag-inherited-panel-background-color, var(--ag-background-color));
	--ag-panel-title-bar-background-color: var(--ag-inherited-panel-title-bar-background-color, var(--ag-header-background-color));
	--ag-panel-title-bar-border: var(--ag-inherited-panel-title-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-panel-title-bar-font-family: var(--ag-inherited-panel-title-bar-font-family, var(--ag-header-font-family));
	--ag-panel-title-bar-font-size: var(--ag-inherited-panel-title-bar-font-size, var(--ag-header-font-size));
	--ag-panel-title-bar-font-weight: var(--ag-inherited-panel-title-bar-font-weight, var(--ag-header-font-weight));
	--ag-panel-title-bar-height: var(--ag-inherited-panel-title-bar-height, var(--ag-header-height));
	--ag-panel-title-bar-icon-color: var(--ag-inherited-panel-title-bar-icon-color, var(--ag-header-text-color));
	--ag-panel-title-bar-text-color: var(--ag-inherited-panel-title-bar-text-color, var(--ag-header-text-color));
	--ag-picker-button-background-color: var(--ag-inherited-picker-button-background-color, var(--ag-background-color));
	--ag-picker-button-border: var(--ag-inherited-picker-button-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-picker-button-border-radius: var(--ag-inherited-picker-button-border-radius, var(--ag-border-radius));
	--ag-picker-button-focus-background-color: var(--ag-inherited-picker-button-focus-background-color, var(--ag-background-color));
	--ag-picker-button-focus-border: var(--ag-inherited-picker-button-focus-border, var(--ag-input-focus-border));
	--ag-picker-field-height: var(--ag-inherited-picker-field-height, calc(max( var(--ag-icon-size) ,  var(--ag-font-size) )  +   var(--ag-spacing)   *  2));
	--ag-picker-list-background-color: var(--ag-inherited-picker-list-background-color, var(--ag-background-color));
	--ag-picker-list-border: var(--ag-inherited-picker-list-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-column-border: var(--ag-inherited-pinned-column-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-background-color: var(--ag-inherited-pinned-row-background-color, var(--ag-data-background-color));
	--ag-pinned-row-border: var(--ag-inherited-pinned-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-pinned-row-font-weight: var(--ag-inherited-pinned-row-font-weight, 600);
	--ag-pinned-row-text-color: var(--ag-inherited-pinned-row-text-color, var(--ag-text-color));
	--ag-pinned-source-row-background-color: var(--ag-inherited-pinned-source-row-background-color, var(--ag-data-background-color));
	--ag-pinned-source-row-font-weight: var(--ag-inherited-pinned-source-row-font-weight, 600);
	--ag-pinned-source-row-text-color: var(--ag-inherited-pinned-source-row-text-color, var(--ag-text-color));
	--ag-popup-shadow: var(--ag-inherited-popup-shadow, 0 0 16px #00000026);
	--ag-radio-checked-shape-image: var(--ag-inherited-radio-checked-shape-image, url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%226%22%20height%3D%226%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E"));
	--ag-range-header-highlight-color: var(--ag-inherited-range-header-highlight-color, color-mix(in srgb, var(--ag-header-background-color), var(--ag-foreground-color) 8%));
	--ag-range-selection-background-color: var(--ag-inherited-range-selection-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 20%));
	--ag-range-selection-border-color: var(--ag-inherited-range-selection-border-color, var(--ag-accent-color));
	--ag-range-selection-border-style: var(--ag-inherited-range-selection-border-style, solid);
	--ag-range-selection-chart-background-color: var(--ag-inherited-range-selection-chart-background-color, #0058FF1A);
	--ag-range-selection-chart-category-background-color: var(--ag-inherited-range-selection-chart-category-background-color, #00FF841A);
	--ag-range-selection-highlight-color: var(--ag-inherited-range-selection-highlight-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-batch-edit-background-color: var(--ag-inherited-row-batch-edit-background-color, var(--ag-cell-batch-edit-background-color));
	--ag-row-batch-edit-text-color: var(--ag-inherited-row-batch-edit-text-color, var(--ag-cell-batch-edit-text-color));
	--ag-row-border: var(--ag-inherited-row-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-row-drag-indicator-color: var(--ag-inherited-row-drag-indicator-color, var(--ag-range-selection-border-color));
	--ag-row-drag-indicator-width: var(--ag-inherited-row-drag-indicator-width, 2px);
	--ag-row-group-indent-size: var(--ag-inherited-row-group-indent-size, calc( var(--ag-cell-widget-spacing)   +   var(--ag-icon-size) ));
	--ag-row-height: var(--ag-inherited-row-height, calc(max( var(--ag-icon-size) ,  var(--ag-cell-font-size) )  +   var(--ag-spacing)   *  3.25  *   var(--ag-row-vertical-padding-scale) ));
	--ag-row-hover-color: var(--ag-inherited-row-hover-color, color-mix(in srgb, transparent, var(--ag-accent-color) 8%));
	--ag-row-loading-skeleton-effect-color: var(--ag-inherited-row-loading-skeleton-effect-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 15%));
	--ag-row-numbers-selected-color: var(--ag-inherited-row-numbers-selected-color, color-mix(in srgb, transparent, var(--ag-accent-color) 50%));
	--ag-row-vertical-padding-scale: var(--ag-inherited-row-vertical-padding-scale, 1);
	--ag-select-cell-background-color: var(--ag-inherited-select-cell-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 7.000000000000001%));
	--ag-select-cell-border: var(--ag-inherited-select-cell-border, solid var(--ag-border-width) color-mix(in srgb, transparent, var(--ag-foreground-color) 13%));
	--ag-selected-row-background-color: var(--ag-inherited-selected-row-background-color, color-mix(in srgb, transparent, var(--ag-accent-color) 12%));
	--ag-set-filter-indent-size: var(--ag-inherited-set-filter-indent-size, var(--ag-icon-size));
	--ag-side-bar-background-color: var(--ag-inherited-side-bar-background-color, var(--ag-chrome-background-color));
	--ag-side-bar-panel-animation-duration: var(--ag-inherited-side-bar-panel-animation-duration, 0s);
	--ag-side-bar-panel-width: var(--ag-inherited-side-bar-panel-width, 250px);
	--ag-side-button-background-color: var(--ag-inherited-side-button-background-color, transparent);
	--ag-side-button-bar-background-color: var(--ag-inherited-side-button-bar-background-color, var(--ag-side-bar-background-color));
	--ag-side-button-bar-top-padding: var(--ag-inherited-side-button-bar-top-padding, 0px);
	--ag-side-button-border: var(--ag-inherited-side-button-border, solid 1px transparent);
	--ag-side-button-hover-background-color: var(--ag-inherited-side-button-hover-background-color, var(--ag-side-button-background-color));
	--ag-side-button-hover-text-color: var(--ag-inherited-side-button-hover-text-color, var(--ag-side-button-text-color));
	--ag-side-button-left-padding: var(--ag-inherited-side-button-left-padding, var(--ag-spacing));
	--ag-side-button-right-padding: var(--ag-inherited-side-button-right-padding, var(--ag-spacing));
	--ag-side-button-selected-background-color: var(--ag-inherited-side-button-selected-background-color, var(--ag-background-color));
	--ag-side-button-selected-border: var(--ag-inherited-side-button-selected-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-side-button-selected-text-color: var(--ag-inherited-side-button-selected-text-color, var(--ag-side-button-text-color));
	--ag-side-button-selected-underline-color: var(--ag-inherited-side-button-selected-underline-color, transparent);
	--ag-side-button-selected-underline-transition-duration: var(--ag-inherited-side-button-selected-underline-transition-duration, 0s);
	--ag-side-button-selected-underline-width: var(--ag-inherited-side-button-selected-underline-width, 2px);
	--ag-side-button-text-color: var(--ag-inherited-side-button-text-color, var(--ag-text-color));
	--ag-side-button-vertical-padding: var(--ag-inherited-side-button-vertical-padding, calc( var(--ag-spacing)   *  3));
	--ag-side-panel-border: var(--ag-inherited-side-panel-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-spacing: var(--ag-inherited-spacing, 8px);
	--ag-status-bar-label-color: var(--ag-inherited-status-bar-label-color, var(--ag-foreground-color));
	--ag-status-bar-label-font-weight: var(--ag-inherited-status-bar-label-font-weight, 500);
	--ag-status-bar-value-color: var(--ag-inherited-status-bar-value-color, var(--ag-foreground-color));
	--ag-status-bar-value-font-weight: var(--ag-inherited-status-bar-value-font-weight, 500);
	--ag-subtle-text-color: var(--ag-inherited-subtle-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 50%));
	--ag-tab-background-color: var(--ag-inherited-tab-background-color, transparent);
	--ag-tab-bar-background-color: var(--ag-inherited-tab-bar-background-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 5%));
	--ag-tab-bar-border: var(--ag-inherited-tab-bar-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tab-bar-horizontal-padding: var(--ag-inherited-tab-bar-horizontal-padding, 0px);
	--ag-tab-bar-top-padding: var(--ag-inherited-tab-bar-top-padding, 0px);
	--ag-tab-bottom-padding: var(--ag-inherited-tab-bottom-padding, var(--ag-spacing));
	--ag-tab-horizontal-padding: var(--ag-inherited-tab-horizontal-padding, var(--ag-spacing));
	--ag-tab-hover-background-color: var(--ag-inherited-tab-hover-background-color, var(--ag-tab-background-color));
	--ag-tab-hover-text-color: var(--ag-inherited-tab-hover-text-color, var(--ag-text-color));
	--ag-tab-selected-background-color: var(--ag-inherited-tab-selected-background-color, var(--ag-background-color));
	--ag-tab-selected-border-color: var(--ag-inherited-tab-selected-border-color, var(--ag-border-color));
	--ag-tab-selected-border-width: var(--ag-inherited-tab-selected-border-width, var(--ag-border-width));
	--ag-tab-selected-text-color: var(--ag-inherited-tab-selected-text-color, var(--ag-text-color));
	--ag-tab-selected-underline-color: var(--ag-inherited-tab-selected-underline-color, transparent);
	--ag-tab-selected-underline-transition-duration: var(--ag-inherited-tab-selected-underline-transition-duration, 0s);
	--ag-tab-selected-underline-width: var(--ag-inherited-tab-selected-underline-width, 0px);
	--ag-tab-spacing: var(--ag-inherited-tab-spacing, 0);
	--ag-tab-text-color: var(--ag-inherited-tab-text-color, color-mix(in srgb, transparent, var(--ag-text-color) 70%));
	--ag-tab-top-padding: var(--ag-inherited-tab-top-padding, var(--ag-spacing));
	--ag-text-color: var(--ag-inherited-text-color, var(--ag-foreground-color));
	--ag-toggle-button-height: var(--ag-inherited-toggle-button-height, 18px);
	--ag-toggle-button-off-background-color: var(--ag-inherited-toggle-button-off-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 30%));
	--ag-toggle-button-on-background-color: var(--ag-inherited-toggle-button-on-background-color, var(--ag-accent-color));
	--ag-toggle-button-switch-background-color: var(--ag-inherited-toggle-button-switch-background-color, var(--ag-background-color));
	--ag-toggle-button-switch-inset: var(--ag-inherited-toggle-button-switch-inset, 2px);
	--ag-toggle-button-width: var(--ag-inherited-toggle-button-width, 28px);
	--ag-tool-panel-separator-border: var(--ag-inherited-tool-panel-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-background-color: var(--ag-inherited-toolbar-background-color, var(--ag-header-background-color));
	--ag-toolbar-separator-border: var(--ag-inherited-toolbar-separator-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-toolbar-text-color: var(--ag-inherited-toolbar-text-color, var(--ag-header-text-color));
	--ag-tooltip-background-color: var(--ag-inherited-tooltip-background-color, var(--ag-chrome-background-color));
	--ag-tooltip-border: var(--ag-inherited-tooltip-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-tooltip-error-background-color: var(--ag-inherited-tooltip-error-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 10%));
	--ag-tooltip-error-border: var(--ag-inherited-tooltip-error-border, solid var(--ag-border-width) color-mix(in srgb, var(--ag-background-color), var(--ag-invalid-color) 25%));
	--ag-tooltip-error-text-color: var(--ag-inherited-tooltip-error-text-color, var(--ag-invalid-color));
	--ag-tooltip-text-color: var(--ag-inherited-tooltip-text-color, var(--ag-text-color));
	--ag-value-change-delta-down-color: var(--ag-inherited-value-change-delta-down-color, #e53935);
	--ag-value-change-delta-up-color: var(--ag-inherited-value-change-delta-up-color, #43a047);
	--ag-value-change-value-highlight-background-color: var(--ag-inherited-value-change-value-highlight-background-color, #16a08580);
	--ag-widget-container-horizontal-padding: var(--ag-inherited-widget-container-horizontal-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-container-vertical-padding: var(--ag-inherited-widget-container-vertical-padding, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-horizontal-spacing: var(--ag-inherited-widget-horizontal-spacing, calc( var(--ag-spacing)   *  1.5));
	--ag-widget-vertical-spacing: var(--ag-inherited-widget-vertical-spacing, var(--ag-spacing));
	--ag-wrapper-background-color: var(--ag-inherited-wrapper-background-color, var(--ag-background-color));
	--ag-wrapper-border: var(--ag-inherited-wrapper-border, solid var(--ag-border-width) var(--ag-border-color));
	--ag-wrapper-border-radius: var(--ag-inherited-wrapper-border-radius, 4px);
:where(html[data-ag-theme-mode="light"],body[data-ag-theme-mode="light"],.ag-theme-mode[data-ag-theme-mode="light"]) & {
	--ag-background-color: var(--ag-inherited-background-color, #fff);
	--ag-border-color: var(--ag-inherited-border-color, color-mix(in srgb, transparent, var(--ag-foreground-color) 15%));
	--ag-browser-color-scheme: var(--ag-inherited-browser-color-scheme, light);
	--ag-chrome-background-color: var(--ag-inherited-chrome-background-color, color-mix(in srgb, var(--ag-background-color), var(--ag-foreground-color) 2%));
	--ag-foreground-color: var(--ag-inherited-foreground-color, #181d1f);
}
.ag-overlay{inset:0;pointer-events:none;position:absolute;z-index:2}
:where(.ag-theme-styleQuartz-7) {
:where(.ag-number-field.ag-paging-number) .ag-input-field-input{padding-bottom:1px}
:where(.ag-theme-inputStyle-5) {
:where(.ag-input-field-input[type=number]:not(.ag-number-field-input-stepper)){-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}
.ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){background-color:var(--ag-input-background-color);border:var(--ag-input-border);border-radius:var(--ag-input-border-radius);color:var(--ag-input-text-color);min-height:var(--ag-input-height);padding-inline:var(--ag-input-padding-start);&:where(:disabled){background-color:var(--ag-input-disabled-background-color);border:var(--ag-input-disabled-border);color:var(--ag-input-disabled-text-color)}
:where(.ag-ltr) :where(.ag-column-select-header-filter-wrapper),:where(.ag-ltr) :where(.ag-filter-add-select),:where(.ag-ltr) :where(.ag-filter-filter),:where(.ag-ltr) :where(.ag-filter-toolpanel-search),:where(.ag-ltr) :where(.ag-floating-filter-search-icon),:where(.ag-ltr) :where(.ag-mini-filter){.ag-input-wrapper:before{margin-left:var(--ag-spacing)}
.ag-number-field-input,.ag-text-field-input{padding-left:calc(var(--ag-spacing)*1.5 + 12px)}
.ag-number-field-input,.ag-text-field-input{padding-right:calc(var(--ag-spacing)*1.5 + 12px)}
.ag-input-field-input:where(input:not([type]),input[type=text],input[type=number],input[type=tel],input[type=date],input[type=datetime-local],textarea){&:focus{box-shadow:var(--ag-focus-shadow);&:where(.invalid),&:where(:invalid){box-shadow:var(--ag-focus-error-shadow)}
.ag-paging-panel{align-items:center;border-top:var(--ag-footer-row-border);display:flex;height:var(--ag-pagination-panel-height);overflow:auto hidden;scrollbar-width:thin}
:where(.ag-theme-iconSet-3) {
.ag-icon-aggregation::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%207V4H6l6%208-6%208h12v-3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-arrows::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%225%209%202%2012%205%2015%22%2F%3E%3Cpolyline%20points%3D%229%205%2012%202%2015%205%22%2F%3E%3Cpolyline%20points%3D%2215%2019%2012%2022%209%2019%22%2F%3E%3Cpolyline%20points%3D%2219%209%2022%2012%2019%2015%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-asc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cancel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m18%206-12%2012%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chart::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2218%22%20x2%3D%2218%22%20y1%3D%2220%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2220%22%20y2%3D%224%22%2F%3E%3Cline%20x1%3D%226%22%20x2%3D%226%22%20y1%3D%2220%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-color-picker::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m19%2011-8-8-8.6%208.6a2%202%200%200%200%200%202.8l5.2%205.2c.8.8%202%20.8%202.8%200L19%2011Z%22%2F%3E%3Cpath%20d%3D%22m5%202%205%205%22%2F%3E%3Cpath%20d%3D%22M2%2013h15%22%2F%3E%3Cpath%20d%3D%22M22%2020a2%202%200%201%201-4%200c0-1.6%201.7-2.4%202-4%20.3%201.6%202%202.4%202%204Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-columns::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%203H5a2%202%200%200%200-2%202v4m6-6h10a2%202%200%200%201%202%202v4M9%203v18m0%200h10a2%202%200%200%200%202-2V9M9%2021H5a2%202%200%200%201-2-2V9m0%200h18%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-contracted::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-copy::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%2214%22%20height%3D%2214%22%20x%3D%228%22%20y%3D%228%22%20rx%3D%222%22%20ry%3D%222%22%2F%3E%3Cpath%20d%3D%22M4%2016c-1.1%200-2-.9-2-2V4c0-1.1.9-2%202-2h10c1.1%200%202%20.9%202%202%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cross::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M18%206%206%2018%22%2F%3E%3Cpath%20d%3D%22m6%206%2012%2012%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-csv::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-cut::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M8.12%208.12%2012%2012%22%2F%3E%3Cpath%20d%3D%22M20%204%208.12%2015.88%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20r%3D%223%22%2F%3E%3Cpath%20d%3D%22M14.8%2014.8%2020%2020%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-desc::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%205v14%22%2F%3E%3Cpath%20d%3D%22m19%2012-7%207-7-7%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-excel::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M14.5%202H6a2%202%200%200%200-2%202v16a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2V7.5L14.5%202z%22%2F%3E%3Cpolyline%20points%3D%2214%202%2014%208%2020%208%22%2F%3E%3Cpath%20d%3D%22M8%2013h2%22%2F%3E%3Cpath%20d%3D%22M8%2017h2%22%2F%3E%3Cpath%20d%3D%22M14%2013h2%22%2F%3E%3Cpath%20d%3D%22M14%2017h2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-expanded::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M2%2012s3-7%2010-7%2010%207%2010%207-3%207-10%207-10-7-10-7Z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-eye-slash::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9.88%209.88a3%203%200%201%200%204.24%204.24%22%2F%3E%3Cpath%20d%3D%22M10.73%205.08A10.43%2010.43%200%200%201%2012%205c7%200%2010%207%2010%207a13.16%2013.16%200%200%201-1.67%202.68%22%2F%3E%3Cpath%20d%3D%22M6.61%206.61A13.526%2013.526%200%200%200%202%2012s3%207%2010%207a9.74%209.74%200%200%200%205.39-1.61%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M7%2012h10%22%2F%3E%3Cpath%20d%3D%22M10%2018h4%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-first::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m17%2018-6-6%206-6%22%2F%3E%3Cpath%20d%3D%22M7%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-grip::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%220.5%22%2F%3E%3Cg%20stroke%3D%22none%22%20fill%3D%22currentColor%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%228%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2219%22%20cy%3D%2216%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); }
.ag-icon-group::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M16%2012H3%22%2F%3E%3Cpath%20d%3D%22M16%2018H3%22%2F%3E%3Cpath%20d%3D%22M10%206H3%22%2F%3E%3Cpath%20d%3D%22M21%2018V8a2%202%200%200%200-2-2h-5%22%2F%3E%3Cpath%20d%3D%22m16%208-2-2%202-2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-last::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2018%206-6-6-6%22%2F%3E%3Cpath%20d%3D%22M17%206v12%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m12%2019-7-7%207-7%22%2F%3E%3Cpath%20d%3D%22M19%2012H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-linked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207h2%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%201%201%200%2010h-2%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2216%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-loading::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%222%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2218%22%20y2%3D%2222%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%224.93%22%20y2%3D%227.76%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%2216.24%22%20y2%3D%2219.07%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%226%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%2218%22%20x2%3D%2222%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224.93%22%20x2%3D%227.76%22%20y1%3D%2219.07%22%20y2%3D%2216.24%22%2F%3E%3Cline%20x1%3D%2216.24%22%20x2%3D%2219.07%22%20y1%3D%227.76%22%20y2%3D%224.93%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-maximize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%2215%203%2021%203%2021%209%22%2F%3E%3Cpolyline%20points%3D%229%2021%203%2021%203%2015%22%2F%3E%3Cline%20x1%3D%2221%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2210%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%226%22%20y2%3D%226%22%2F%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2218%22%20y2%3D%2218%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-menu-alt::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%220.75%22%20fill%3D%22%23D9D9D9%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minimize::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpolyline%20points%3D%224%2014%2010%2014%2010%2020%22%2F%3E%3Cpolyline%20points%3D%2220%2010%2014%2010%2014%204%22%2F%3E%3Cline%20x1%3D%2214%22%20x2%3D%2221%22%20y1%3D%2210%22%20y2%3D%223%22%2F%3E%3Cline%20x1%3D%223%22%20x2%3D%2210%22%20y1%3D%2221%22%20y2%3D%2214%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-minus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-next::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-none::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m7%2015%205%205%205-5%22%2F%3E%3Cpath%20d%3D%22m7%209%205-5%205%205%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-not-allowed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m4.9%204.9%2014.2%2014.2%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-paste::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%202H9a1%201%200%200%200-1%201v2c0%20.6.4%201%201%201h6c.6%200%201-.4%201-1V3c0-.6-.4-1-1-1Z%22%2F%3E%3Cpath%20d%3D%22M8%204H6a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h12a2%202%200%200%200%202-2M16%204h2a2%202%200%200%201%202%202v2M11%2014h10%22%2F%3E%3Cpath%20d%3D%22m17%2010%204%204-4%204%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cline%20x1%3D%2212%22%20x2%3D%2212%22%20y1%3D%2217%22%20y2%3D%2222%22%2F%3E%3Cpath%20d%3D%22M5%2017h14v-1.76a2%202%200%200%200-1.11-1.79l-1.78-.9A2%202%200%200%201%2015%2010.76V6h1a2%202%200%200%200%200-4H8a2%202%200%200%200%200%204h1v4.76a2%202%200%200%201-1.11%201.79l-1.78.9A2%202%200%200%200%205%2015.24Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pivot::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M15%203v18%22%2F%3E%3Crect%20width%3D%2218%22%20height%3D%2218%22%20x%3D%223%22%20y%3D%223%22%20rx%3D%222%22%2F%3E%3Cpath%20d%3D%22M21%209H3%22%2F%3E%3Cpath%20d%3D%22M21%2015H3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-plus::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M8%2012h8%22%2F%3E%3Cpath%20d%3D%22M12%208v8%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-previous::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3Cpath%20d%3D%22m12%205%207%207-7%207%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-save::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M12%2017V3%22%2F%3E%3Cpath%20d%3D%22m6%2011%206%206%206-6%22%2F%3E%3Cpath%20d%3D%22M19%2021H5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-search::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Ccircle%20cx%3D%2211%22%20cy%3D%2211%22%20r%3D%228%22%2F%3E%3Cpath%20d%3D%22m21%2021-4.3-4.3%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-settings::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%207h-9%22%2F%3E%3Cpath%20d%3D%22M14%2017H5%22%2F%3E%3Ccircle%20cx%3D%2217%22%20cy%3D%2217%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%223%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m15%2018-6-6%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tick::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-closed::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-indeterminate::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M5%2012h14%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-tree-open::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-unlinked::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M9%2017H7A5%205%200%200%201%207%207%22%2F%3E%3Cpath%20d%3D%22M15%207h2a5%205%200%200%201%204%208%22%2F%3E%3Cline%20x1%3D%228%22%20x2%3D%2212%22%20y1%3D%2212%22%20y2%3D%2212%22%2F%3E%3Cline%20x1%3D%222%22%20x2%3D%2222%22%20y1%3D%222%22%20y2%3D%2222%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22m5%2012%207-7%207%207%22%2F%3E%3Cpath%20d%3D%22M12%2019V5%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-aasc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M13.2012%208.07928C13.6346%208.0793%2014.0128%208.15365%2014.3359%208.30193C14.6609%208.45018%2014.9141%208.65595%2015.0947%208.9201C15.2754%209.18439%2015.3683%209.49109%2015.374%209.83904H14.1904C14.1676%209.60898%2014.0695%209.4303%2013.8965%209.30291C13.7235%209.1756%2013.4889%209.1115%2013.1924%209.1115C12.9909%209.1115%2012.8204%209.1404%2012.6816%209.19744C12.543%209.25255%2012.4364%209.32917%2012.3623%209.42791C12.2901%209.52678%2012.2539%209.63933%2012.2539%209.76482C12.2501%209.8692%2012.272%209.9604%2012.3193%2010.0383C12.3688%2010.1162%2012.4369%2010.1843%2012.5225%2010.2414C12.6079%2010.2964%2012.7064%2010.3451%2012.8184%2010.3869C12.9304%2010.4268%2013.0505%2010.4609%2013.1777%2010.4894L13.7031%2010.6144C13.9578%2010.6715%2014.1914%2010.7479%2014.4043%2010.8429C14.6173%2010.938%2014.8021%2011.0547%2014.958%2011.1935C15.1138%2011.3323%2015.2348%2011.4957%2015.3203%2011.6838C15.4077%2011.8719%2015.4522%2012.088%2015.4541%2012.3312C15.4522%2012.6885%2015.3611%2012.9986%2015.1807%2013.2609C15.0019%2013.5214%2014.7427%2013.7248%2014.4043%2013.8693C14.0678%2014.0118%2013.6617%2014.0832%2013.1865%2014.0832C12.7153%2014.0832%2012.3048%2014.0107%2011.9551%2013.8664C11.6071%2013.7219%2011.3345%2013.5071%2011.1387%2013.2238C10.9449%2012.9387%2010.8435%2012.5862%2010.834%2012.1662H12.0283C12.0416%2012.362%2012.0984%2012.5252%2012.1973%2012.6564C12.298%2012.7857%2012.4323%2012.8838%2012.5996%2012.9504C12.7688%2013.0149%2012.96%2013.047%2013.1729%2013.047C13.3817%2013.047%2013.563%2013.0169%2013.7168%2012.9562C13.8727%2012.8954%2013.9935%2012.8106%2014.0791%2012.7023C14.1647%2012.5939%2014.208%2012.469%2014.208%2012.3283C14.2079%2012.1974%2014.1686%2012.0875%2014.0908%2011.9982C14.0148%2011.9089%2013.9022%2011.8324%2013.7539%2011.7697C13.6076%2011.707%2013.4276%2011.6501%2013.2148%2011.5988L12.5791%2011.4387C12.0869%2011.3189%2011.6982%2011.1318%2011.4131%2010.8771C11.128%2010.6224%2010.9855%2010.2793%2010.9873%209.84783C10.9854%209.49418%2011.0804%209.18439%2011.2705%208.9201C11.4625%208.65603%2011.7261%208.45015%2012.0605%208.30193C12.3951%208.15369%2012.7754%208.07928%2013.2012%208.07928Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%2014.0002H4.48926L4.05664%2012.6681H1.94824L1.51465%2014.0002H0.19043L2.20703%208.15935H3.79883L5.8125%2014.0002ZM2.26172%2011.7043H3.74316L3.02539%209.49334H2.98047L2.26172%2011.7043Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%208.15935C8.88165%208.15935%209.24031%208.22251%209.52734%208.34978C9.81445%208.47717%2010.0303%208.65477%2010.1748%208.88103C10.3192%209.10536%2010.3916%209.36368%2010.3916%209.65642C10.3916%209.88452%2010.3461%2010.085%2010.2549%2010.258C10.1637%2010.4289%2010.0384%2010.5696%209.87891%2010.6799C9.72117%2010.7882%209.54024%2010.8657%209.33691%2010.9113V10.9679C9.55917%2010.9775%209.76716%2011.0406%209.96094%2011.1564C10.1568%2011.2724%2010.3158%2011.4356%2010.4375%2011.6447C10.5591%2011.8519%2010.6201%2012.099%2010.6201%2012.3859C10.6201%2012.6958%2010.5427%2012.9727%2010.3887%2013.216C10.2366%2013.4573%2010.0113%2013.6486%209.71289%2013.7892C9.41443%2013.9299%209.04655%2014.0002%208.60938%2014.0002H6.11426V8.15935H8.45215ZM7.34863%2012.9904H8.35547C8.69943%2012.9904%208.95057%2012.9252%209.1084%2012.7941C9.26621%2012.661%209.34473%2012.4834%209.34473%2012.2629C9.34468%2012.1014%209.30643%2011.9587%209.22852%2011.8351C9.15056%2011.7116%209.03903%2011.6145%208.89453%2011.5441C8.75195%2011.4738%208.58148%2011.4387%208.38379%2011.4387H7.34863V12.9904ZM7.34863%2010.6037H8.26465C8.43369%2010.6036%208.58376%2010.5737%208.71484%2010.5148C8.84793%2010.454%208.95227%2010.3683%209.02832%2010.258C9.10628%2010.1477%209.14551%2010.0155%209.14551%209.8615C9.14546%209.65055%209.07008%209.48001%208.91992%209.35076C8.77165%209.22169%208.56064%209.15741%208.28711%209.1574H7.34863V10.6037Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M7.16602%200.377127C7.44584%200.189493%207.82551%200.20905%208.08496%200.442557L11.418%203.44256C11.7257%203.71966%2011.7507%204.19428%2011.4736%204.50213C11.1966%204.80961%2010.7228%204.83441%2010.415%204.55779L7.60938%202.03338L5.11328%204.53045C4.82042%204.82326%204.34562%204.82322%204.05273%204.53045C3.75986%204.23757%203.75989%203.7628%204.05273%203.4699L7.05273%200.4699L7.16602%200.377127Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-adesc::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10.3867%2011.4697C10.6796%2011.1771%2011.1544%2011.1769%2011.4473%2011.4697C11.7399%2011.7626%2011.7399%2012.2374%2011.4473%2012.5303L8.44727%2015.5303L8.33398%2015.623C8.05425%2015.8106%207.67449%2015.7909%207.41504%2015.5576L4.08203%2012.5576C3.77415%2012.2805%203.74927%2011.8059%204.02637%2011.498C4.30342%2011.1907%204.77722%2011.1657%205.08496%2011.4424L7.89062%2013.9668L10.3867%2011.4697Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M13.2012%203.0791C13.6346%203.07912%2014.0128%203.1535%2014.3359%203.30176C14.6611%203.45006%2014.9141%203.65661%2015.0947%203.9209C15.2752%204.18513%2015.3683%204.49104%2015.374%204.83887H14.1904C14.1676%204.60882%2014.0695%204.43012%2013.8965%204.30273C13.7235%204.17546%2013.4889%204.11133%2013.1924%204.11133C12.9909%204.11133%2012.8204%204.14023%2012.6816%204.19727C12.5431%204.25236%2012.4364%204.32902%2012.3623%204.42773C12.2901%204.52659%2012.2539%204.63919%2012.2539%204.76465C12.2501%204.86901%2012.272%204.96023%2012.3193%205.03809C12.3688%205.11604%2012.4369%205.18417%2012.5225%205.24121C12.6079%205.29623%2012.7064%205.34496%2012.8184%205.38672C12.9304%205.42661%2013.0505%205.46075%2013.1777%205.48926L13.7031%205.61426C13.9578%205.67128%2014.1914%205.74776%2014.4043%205.84277C14.6172%205.93784%2014.8021%206.05457%2014.958%206.19336C15.1139%206.33216%2015.2348%206.49633%2015.3203%206.68457C15.4076%206.8727%2015.4522%207.08885%2015.4541%207.33203C15.4521%207.68929%2015.3612%207.99944%2015.1807%208.26172C15.0019%208.52216%2014.7427%208.72465%2014.4043%208.86914C14.0678%209.01165%2013.6617%209.08301%2013.1865%209.08301C12.7153%209.08299%2012.3048%209.01057%2011.9551%208.86621C11.6072%208.72173%2011.3345%208.50786%2011.1387%208.22461C10.9447%207.9394%2010.8435%207.58622%2010.834%207.16602H12.0283C12.0416%207.36176%2012.0985%207.52509%2012.1973%207.65625C12.298%207.78554%2012.4323%207.88365%2012.5996%207.9502C12.7688%208.01477%2012.96%208.04785%2013.1729%208.04785C13.3817%208.04781%2013.5629%208.01678%2013.7168%207.95605C13.8727%207.89522%2013.9935%207.81051%2014.0791%207.70215C14.1646%207.59387%2014.2079%207.46965%2014.208%207.3291C14.208%207.19796%2014.1687%207.08739%2014.0908%206.99805C14.0148%206.90868%2013.9022%206.83228%2013.7539%206.76953C13.6076%206.70685%2013.4276%206.64993%2013.2148%206.59863L12.5791%206.43848C12.0868%206.31871%2011.6982%206.13163%2011.4131%205.87695C11.1279%205.62221%2010.9855%205.27916%2010.9873%204.84766C10.9854%204.49404%2011.0804%204.18517%2011.2705%203.9209C11.4625%203.65661%2011.7259%203.45006%2012.0605%203.30176C12.3951%203.15353%2012.7754%203.0791%2013.2012%203.0791Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.8125%209H4.48926L4.05664%207.66797H1.94824L1.51465%209H0.19043L2.20703%203.15918H3.79883L5.8125%209ZM2.26172%206.7041H3.74316L3.02539%204.49414H2.98047L2.26172%206.7041Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.45215%203.15918C8.88181%203.15918%209.24025%203.22322%209.52734%203.35059C9.81445%203.47798%2010.0303%203.6546%2010.1748%203.88086C10.3193%204.10518%2010.3916%204.36351%2010.3916%204.65625C10.3916%204.88432%2010.3461%205.08484%2010.2549%205.25781C10.1636%205.4289%2010.0386%205.57039%209.87891%205.68066C9.72118%205.78898%209.54022%205.86549%209.33691%205.91113V5.96875C9.55913%205.9783%209.76719%206.04044%209.96094%206.15625C10.1568%206.27223%2010.3158%206.43538%2010.4375%206.64453C10.5591%206.85173%2010.6201%207.09875%2010.6201%207.38574C10.6201%207.69567%2010.5427%207.97245%2010.3887%208.21582C10.2366%208.45719%2010.0113%208.64841%209.71289%208.78906C9.41442%208.9297%209.04658%208.99999%208.60938%209H6.11426V3.15918H8.45215ZM7.34863%207.99023H8.35547C8.69948%207.99023%208.95057%207.92504%209.1084%207.79395C9.26621%207.66085%209.34473%207.48325%209.34473%207.2627C9.34466%207.10125%209.3064%206.95844%209.22852%206.83496C9.15056%206.71143%209.03899%206.61427%208.89453%206.54395C8.75196%206.47365%208.58145%206.43848%208.38379%206.43848H7.34863V7.99023ZM7.34863%205.60352H8.26465C8.43369%205.60347%208.58376%205.57354%208.71484%205.51465C8.84791%205.45381%208.95228%205.36807%209.02832%205.25781C9.10623%205.14755%209.14551%205.01529%209.14551%204.86133C9.14542%204.65046%209.07002%204.48078%208.91992%204.35156C8.77163%204.22228%208.56087%204.15724%208.28711%204.15723H7.34863V5.60352Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%206L8%2010L4%206%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-left::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2012L6%208L10%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-right::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%2012L10%208L6%204%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-chevron-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%2010L8%206L12%2010%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-column-arrow::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%2026C0%2028.2092%201.79086%2030%204%2030H14C16.2091%2030%2018%2028.2092%2018%2026V15H25.8786L24.4394%2016.4393C23.8536%2017.0251%2023.8536%2017.9749%2024.4394%2018.5607C25.0252%2019.1464%2025.9748%2019.1464%2026.5606%2018.5607L30.5606%2014.5607C31.1464%2013.9749%2031.1464%2013.0251%2030.5606%2012.4393L26.5606%208.43934C25.9748%207.85356%2025.0252%207.85356%2024.4394%208.43934C23.8536%209.02512%2023.8536%209.97488%2024.4394%2010.5607L25.8786%2012H18V6C18%203.79086%2016.2091%202%2014%202H4C1.79086%202%200%203.79086%200%206V26ZM14%205H10.5V12H15V6C15%205.44772%2014.5523%205%2014%205ZM4%205H7.5V12H3V6C3%205.44772%203.44772%205%204%205ZM10.5%2015H15V26C15%2026.5522%2014.5523%2027%2014%2027H10.5V15ZM4%2027H7.5V15H3V26C3%2026.5522%203.44772%2027%204%2027Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-document::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.66663%2014.3333V1.66667C2.66663%201.29848%202.9651%201%203.33329%201H9.33329L13.3333%205V14.3333C13.3333%2014.7015%2013.0348%2015%2012.6666%2015H3.33329C2.9651%2015%202.66663%2014.7015%202.66663%2014.3333Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.33333%22%2F%3E%3Cpath%20d%3D%22M12.6667%206H8V1%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.33333%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-edit::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.5%2010.6262V12.5012H5.375L10.905%206.97122L9.03%205.09622L3.5%2010.6262ZM12.355%205.52122C12.4014%205.47497%2012.4381%205.42002%2012.4632%205.35953C12.4883%205.29905%2012.5012%205.23421%2012.5012%205.16872C12.5012%205.10324%2012.4883%205.0384%2012.4632%204.97791C12.4381%204.91742%2012.4014%204.86248%2012.355%204.81622L11.185%203.64622C11.1387%203.59987%2011.0838%203.5631%2011.0233%203.53801C10.9628%203.51291%2010.898%203.5%2010.8325%203.5C10.767%203.5%2010.7022%203.51291%2010.6417%203.53801C10.5812%203.5631%2010.5263%203.59987%2010.48%203.64622L9.565%204.56122L11.44%206.43622L12.355%205.52122Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter-add::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.12126%207.75L10.8517%207.75%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M6.65934%2011.748L9.32778%2011.748%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M12.2943%201.04872V6.19184M14.9886%203.74341H9.68478%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8.25488%203C8.04799%203.18323%207.91706%203.45099%207.91699%203.74902C7.91713%204.04868%208.04988%204.31681%208.25879%204.5H2C1.58579%204.5%201.25%204.16421%201.25%203.75C1.25%203.33579%201.58579%203%202%203H8.25488Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-bottom::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M3.47%2012.28A.75.75%200%200%201%204%2011h8a.75.75%200%200%201%200%201.5H4a.75.75%200%200%201-.53-.22ZM12.731%205.256a.75.75%200%200%201-.2.524l-4%204a.75.75%200%200%201-1.06%200l-4-4a.75.75%200%201%201%201.06-1.06l2.72%202.72V2a.75.75%200%200%201%201.5%200v5.44l2.72-2.72a.75.75%200%200%201%201.26.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-pinned-top::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M12.53%203.72A.75.75%200%200%201%2012%205H4a.75.75%200%200%201%200-1.5h8a.75.75%200%200%201%20.53.22ZM3.269%2010.744a.75.75%200%200%201%20.2-.524l4-4a.75.75%200%200%201%201.06%200l4%204a.75.75%200%201%201-1.06%201.06L8.75%208.56V14a.75.75%200%200%201-1.5%200V8.56l-2.72%202.72a.75.75%200%200%201-1.26-.536Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-down::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2010.667%2016%2021.334l8.667-10.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-small-up::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2021.333%2016%2010.666l8.667%2010.667H7.334Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-un-pin::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20class%3D%22ag-icon%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M8%2011a.75.75%200%200%200-.75.75v3.333a.75.75%200%201%200%201.5%200V11.75A.75.75%200%200%200%208%2011Z%22%2F%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M13.11%201.436a.75.75%200%200%200-1.22-.872l-10%2014a.75.75%200%201%200%201.22.872L5.207%2012.5h7.376a.75.75%200%200%200%20.75-.75v-1.174a2.08%202.08%200%200%200-1.153-1.863l-1.185-.599-.005-.002a.58.58%200%200%201-.323-.522V5.165a2.083%202.083%200%200%200%201.854-2.904l.589-.825Zm-3.943%205.52v.634a2.08%202.08%200%200%200%201.153%201.863l1.185.6.005.002a.58.58%200%200%201%20.323.522V11H6.28l2.887-4.044ZM9.277%201H5.25a2.084%202.084%200%200%200-.083%204.165v1.676l1.5-2.132v-.292a.75.75%200%200%200-.75-.75H5.25a.584.584%200%200%201%200-1.167h2.972L9.277%201Z%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-fx::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.49158%203.12305H7.50623C6.93834%203.12323%206.44152%203.5064%206.29724%204.05566L5.87439%205.66797H7.48083V7.16797H5.48083L4.06775%2012.5527C3.77958%2013.6508%202.787%2014.417%201.65173%2014.417V12.917C2.10521%2012.917%202.50147%2012.6105%202.61658%2012.1719L3.93005%207.16797H2.42419V5.66797H4.32361L4.84607%203.6748C5.16341%202.46608%206.25655%201.62323%207.50623%201.62305H8.49158V3.12305ZM10.6781%207.5293L12.4115%205.91211H14.6097L14.5648%205.9541L11.4808%208.83203L13.4301%2012H11.6683L10.3617%209.87598L8.08728%2012H5.88904L9.55994%208.57324L7.92224%205.91211H9.68396L10.6781%207.5293Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-values-as::before { mask-image: url('data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11.7631%202.75003C14.3937%204.26881%2014.9593%208.21416%2013.0263%2011.5622C11.0933%2014.9103%207.39373%2016.3932%204.76312%2014.8744C2.13251%2013.3556%201.56698%209.41025%203.49998%206.0622C5.43297%202.71416%209.13251%201.23124%2011.7631%202.75003ZM11.2631%203.61605C10.0674%202.9257%207.75491%204.69245%206.09805%207.5622C4.4412%2010.432%204.06739%2013.318%205.26312%2014.0084C6.45885%2014.6987%208.77133%2012.932%2010.4282%2010.0622C12.085%207.19245%2012.4588%204.30641%2011.2631%203.61605Z%22%20fill%3D%22currentColor%22%2F%3E%3Cpath%20d%3D%22M27.1631%2017.05C29.7938%2018.5688%2030.3593%2022.5142%2028.4263%2025.8622C26.4933%2029.2103%2022.7938%2030.6932%2020.1631%2029.1744C17.5325%2027.6556%2016.967%2023.7103%2018.9%2020.3622C20.833%2017.0142%2024.5325%2015.5312%2027.1631%2017.05ZM26.6631%2017.9161C25.4674%2017.2257%2023.1549%2018.9924%2021.4981%2021.8622C19.8412%2024.732%2019.4674%2027.618%2020.6631%2028.3084C21.8589%2028.9987%2024.1714%2027.232%2025.8282%2024.3622C27.4851%2021.4924%2027.8589%2018.6064%2026.6631%2017.9161Z%22%20fill%3D%22currentColor%22%2F%3E%3Cpath%20d%3D%22M22.7042%202.38759L24.4363%203.38759L9.29419%2029.6145L7.56214%2028.6145L22.7042%202.38759Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E'); }
.ag-icon-filter::before { mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E*%20%7B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M3%206h18%22%2F%3E%3Cpath%20d%3D%22M7%2012h10%22%2F%3E%3Cpath%20d%3D%22M10%2018h4%22%2F%3E%3C%2Fsvg%3E'); }
.noria-parcel-grid,#noria-parcel-grid-mount{height:100%;width:100%}
.noria-parcel-grid .noria-grid-link{color:var(--color-text-link, var(--color-primary, #235069));text-decoration:underline;text-underline-offset:2px;cursor:pointer}
:where(.ag-theme-columnDropStyle-6) {
.ag-column-drop-vertical-empty-message{align-items:center;border:dashed var(--ag-border-width);border-color:var(--ag-border-color);display:flex;inset:0;justify-content:center;margin:calc(var(--ag-spacing)*1.5) calc(var(--ag-spacing)*2);overflow:hidden;padding:calc(var(--ag-spacing)*2);position:absolute}
:where(.ag-theme-checkboxStyle-2) {
.ag-checkbox-input-wrapper,.ag-radio-button-input-wrapper{background-color:var(--ag-checkbox-unchecked-background-color);border:solid var(--ag-checkbox-border-width) var(--ag-checkbox-unchecked-border-color);flex:none;height:var(--ag-icon-size);position:relative;width:var(--ag-icon-size);&:where(.ag-checked){background-color:var(--ag-checkbox-checked-background-color);border-color:var(--ag-checkbox-checked-border-color)}
&:where(.ag-disabled){filter:grayscale();opacity:.5}
.ag-cell-editing-error .ag-checkbox-input-wrapper:focus-within{box-shadow:var(--ag-focus-error-shadow)}
```

## Tokens
- `--ag-internal-hover-color`: rgba(0, 0, 0, 0) _(component)_
- `--ag-internal-moving-color`: rgba(0, 0, 0, 0) _(component)_
- `--color-primary`: #235069 _(semantic)_
- `--color-text-link`: #235069 _(semantic)_
