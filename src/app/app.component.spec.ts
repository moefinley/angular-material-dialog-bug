import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatDialogHarness} from "@angular/material/dialog/testing";
import {By} from "@angular/platform-browser";
import {MatButtonHarness} from "@angular/material/button/testing";
import {DialogComponent} from "./dialog/dialog.component";
import {DebugElement} from "@angular/core";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent, docRootLoader: HarnessLoader;
  let closeSpy = jasmine.createSpy('close');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    docRootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  async function openDialog() {
    let openButton = fixture.debugElement.query(By.css('button'));

    openButton.nativeNode.click();

    let dialogHarness = await docRootLoader.getHarness(MatDialogHarness);
    return dialogHarness;
  }

  it('should open a dialog', async () => {
    let dialogHarness = await openDialog();

    expect(await dialogHarness.getText()).toContain('dialog works!');
  });

  it('should close a dialog when the button is selected using the fixture', async () => {
    let dialogHarness = await openDialog();

    expect(await dialogHarness.getText()).toContain('dialog works!');

    let closeButton = <DebugElement>fixture.debugElement.parent?.query(By.css('#closeButton'));

    closeSpy = spyOn(<MatDialogRef<DialogComponent, any>>app.dialogRef, 'close');

    await closeButton.nativeElement.click();

    /**
     * This will fail because clicking the button did not close the dialog
     */
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should close a dialog when the button is selected using a Harness', async () => {
    let dialogHarness = await openDialog();

    expect(await dialogHarness.getText()).toContain('dialog works!');

    let buttonHarness = await dialogHarness.getHarness(MatButtonHarness.with({text: 'close'}));

    closeSpy = spyOn(<MatDialogRef<DialogComponent, any>>app.dialogRef, 'close');

    expect(await buttonHarness.getText()).toContain('close');

    await buttonHarness.click();

    /**
     * This will fail because clicking the button did not close the dialog
     */
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should close a dialog when called directly', async () => {
    let dialogHarness = await openDialog();

    expect(await dialogHarness.getText()).toContain('dialog works!');

    closeSpy = spyOn(<MatDialogRef<DialogComponent, any>>app.dialogRef, 'close');

    await dialogHarness.close();

    /**
     * This will pass
     */
    expect(closeSpy).toHaveBeenCalled();
  });
});
